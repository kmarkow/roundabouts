Set up project
===
Make sure vagrant and virtualbox are installed on your machine

  1. vagrant plugin install vagrant-vbguest
  1. vagrant up
  1. vagrant ssh
  1. cd /project
  1. npm install

Build and publish
===

  1. grunt build
  1. Visit http://192.168.100.100
  
Build automatically when a file changes
===

  1. grunt watch

Run tests
===

  1. grunt tests
