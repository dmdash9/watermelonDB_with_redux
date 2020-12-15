- its libraries were setup only for Android. So run on Android
- Use ts-standard linter and StandardJS plugin for Visual Studio Code

## Implementation notes
- WatermelonDB uses own generated ids as the source of truth. So, it tracks changes by it
and awaits those Ids to be present in changes received from backend. That is why *delete*, and *sync from backend or pulling changes from backend*
does not work. The needed transformations and logic to make that work is not yet implemented.
- So, only create/update sync from client-to-backend works fine.


## Database Schema:
- MySQL DB
- *workpacks* table
- schema:
- - uuid - int AI PK
- - client_uuid - int
- - name - varchar(45)
- - company_name - varchar(45)
- - start_date - datetime
- - end_date - datetime
- - duct_100_count - int
- - audit_due_date - datetime
- - fulfilment_due_date - datetime
- - updated_at - int(10) UN zerofill
- - is_deleted - tinyint(1)
- - created_at - int(10) UN zerofill

