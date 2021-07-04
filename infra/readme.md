
TODO:
1. run ci/cd env on local
2. install ci/cd env to docker swarm using by ansible
3. up staging
4. up production



Jenkins Jobs

make PR 
-----
1. build the last commit
2. test it all
3. set status on github


PR was merged
----
1. build the commit
2. test 
3. set status on github
4. if bad then notify who accepted the PR and who created the PR
5. if good then build prod images and push them to registry


Added release tag
----
1. add tag to the images in registry


Staging should watch registry and auto deploy the new changes.
Production should be updated only manually 


Staging based on docker swarm.
Do Production based on kubernates?

Tools:
- Ansible
- Docker
- Docker Compose
- Jenkins
- portainer.io
- Docker Swarm
- Kubernates
- Git
- GitHub

