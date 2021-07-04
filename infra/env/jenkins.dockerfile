FROM jenkins/jenkins:lts-jdk11
USER root
RUN chown -R 1000 /var/jenkins_home
# USER jenkins
# ENTRYPOINT ["/sbin/tini", "--", "/usr/local/bin/jenkins.sh"]