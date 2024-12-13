import { Model, model, field, mock } from 'mobx-orm'
import pub_sub from '@/services/pub-sub'


@mock()
@model
export class AsyncTask extends Model {
    @field status ?: string
}

pub_sub.register_model('async-task', AsyncTask)

// PENDING
// STARTED
// SUCCESS
// FAILURE
// RETRY
// REVOKED¶