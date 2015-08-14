#!/bin/bash
sudo apt-get install -y ansible
ansible-playbook /project/vagrant/ansible/vagrant.yml -i /project/vagrant/ansible/inventory
