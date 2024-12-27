
- auth
    - styles for login/logout pages
    - logout button
- UI: dark theme
- show setting on the web page
- show users   on the web page
- events calendar
- user profile
    - set avatar
    - change other things
- UI: current org-user
- UI: move ModelFrom into MobX-ORM

- Org
    - PubSub Notifications
        - you has added to group
        - you has removed from group

- LongTask
    - run task in org-group
        - if you have access to task then you can see secret channel of task
            Note: secret channel should not contain sensitive info, only some progress
            Note: subscribe only if task is not finished yet and unsubscribe if it's finished
    - update progress using pub-sub service

- Journal of events.
    - this is not a pubsub, it's permanent store of events

- User Personal Notifications



- PubSub Notifications
    - user
    - org-user
    - org-user-group
        - dynamic subscribe because groups can be changed in realtime
        - if we can see a org-user-group then we should subscribe
        - if we lost org-user-group - unsubscribe
        - the problem show to understand what group we have access
            - if chenges come from any org-user-group we have to update all groups
                and resubscribe


