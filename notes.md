
## FLOWS

1) Ofline-first (2-way sync)
- online -> db -> success -> redux -> sync
- online -> db -> error
- ofline -> db -> redux
- ofline -> online -> sync

***NOTES***: optimistic updates are a built-in feature as we push to backend sooner or later the changes

***NOTES***: probably because of data cleanup not all data would be always available on client side, so if missing in DB
we shoudlfetch from backend or show that data is not available ofline. We need to store some anchors on client DB 
keeping information below which point the information is erased. Or maybe erase by time expiration but store always
some metadata in client DB tables like total count at least). We need this when to understand that the data is not in DB but
might be present on the backend.

***NOTES***: after long ofline there would be a massive sync from backend, so we still need some batching mechanism
which should be sent to client and there it would affect how frequent the sync would be at the moment. I'd probably would not rely on their *_unsafeBatchPerCollection* field.

***NOTES***: even when online we trigger sync instead of request because sync prepares changes and tracks that by its own/implemented logic.
But request result we should handle by our own if there were an error. So, that is why I think that sync is better.


2) Online-first with ofline support with optimistic updates (1-way sync)
- online -> redux -> backend -> success -> db
- online -> redux -> backend -> error -> rollback redux
- ofline -> db -> redux
- ofline -> online -> sync (only 1-way sync might be supported in this flow as described below in the notes)

3) Online-first with ofline support (1-way sync)
- online -> backend -> success -> redux -> db
- online -> backend -> error
- ofline -> db -> redux
- ofline -> online -> sync (only 1-way sync might be supported in this flow as described below in the notes)


***NOTES***: If we update data on backend and then update local DB then on the backend item's updated_at would be updated 
and on local DB the changes object would have that same changes later pushed to backend.
So there is no point in this flow if we need 2-way sync.

_______________________________________________________________________

## HARDEST PARTS:
- Performant tracking changes on the backend
(
  Storing last_pulled_at on backend the way as we do it now is incorrect. Updating it before client pushed changes means that even if sync was broken
  we forget about previous data. So, either we rely on this timestamp received from client as in the rule
  or we store it in cache and update only in push changes transaction.
  Currently to track all we need to query all. There is a way to query only part if that is known case which can not break anything.
  I think though that in each sync implementation sync tables are queried and data tables are joined to return changes.
)
- Batched syncing if the whole change object related to one user is very big (was offline for a long time).
(
  Not all tables need to be synced and we need to be wise with what we sync and what not.
  Archived workpacks must not be synced at all and might even be in a separate table.
  When client receives batch it can fetch the rest in a loop. Probably we need a adaptive sync-batching based on internet quality.
  When client recieves batch we could dispatch some actions, but the sync must go whole at once.
  Client can not do delayed batching sync. All or nothing. Because if local DB updates last_pulled_at timestamp it would then
  pull with that from backend and gather changes to push starting from it. So this way we would have potential not resolved conflicts and lost sync data.
)
- if we have sync errors we would start syncing that same batch from the beginning, therefore leading to larger sync changes object and to necessity of
batching. And batching might not be delayed. One sync - one go.
- If we do not like the limitations which Watermellon client sync implies on us we might write own sync adapter on the client side as well.
Current adapter is not very complicated. The difference from current sync-solution in the app is that we are not going to poll every 5 seconds and
get current changes and send them in requests to the backend and then fetching back from backend. So, basically we sync only local changes. It is a 1-way sync and
currently we have online-first with a strange solution of sync (relying on observability of WatermelonDB) and support of offline. Even with new sync adapter on client side we would have an ofline-first solution where we would trigger sync only when needed or create a polling again only in editing mode and get changes from Redux store which would have be sliced from local DB.


## QUESTIONS:
- what items do we sync now?
- are they frequently updated by anyone except the user?
- what are the volumes of data and how frequently is it updated in general for the specific user?

- If anyone knew how to write own sync adapter working on a level of separate items instead of the whole DB that would be crasy awesome!!!
I mean, local DB gets last_pulled_at and all items relies on that. If there are conflicts on backend it returns error and everything needs to start again.
But It would be perfect to sync all which succeded and uplift for next sync those which are not. Maybe adding some field 'next_sync'.
And then to pull_changes not only by last_pulled_at but also all with next_sync. In which case we also might need to add to push changes array of next_sync
items we need to move back to normal.


## Simplifications:
- client uuid - just from workpack template
- workpack uuid - from template not auto-incremented