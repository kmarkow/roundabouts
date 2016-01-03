# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure(2) do |config|
  config.vm.box = "debian/jessie64"
  config.vm.network "forwarded_port", guest: 80, host: 8080, auto_correct: true
  config.vm.network "private_network", ip: "192.168.100.100"
  config.vm.synced_folder ".", "/project"
  config.vm.provision "shell", path: "vagrant/provision.sh"
end
