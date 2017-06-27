# My First Blueprint
This is a sample project to prove out using an Ember Blueprint to create crud screens based off Ember models.

## User Notes:
- This code will leave `todo-crud` comments in your code that prompt you to check the default implementation
- By default, will not use format helpers for data types such as dates, numbers, etc.  Will leave to the developer to
implement

TODO:
- Move to an add-on
  - Write tests.  Consider Ember Mirage
- Consider how we handle hasMany (including many-to-many) relationships
- Create blueprint to generate config files.  Double check if this is a good idea if we are also generating from db model
  - Look into this https://stackoverflow.com/a/44668632/403264
- Update the router directly using Richie's idea (see https://github.com/ember-cli/ember-router-generator and
https://github.com/ash-framework/cli/blob/master/lib/commands/ash-generate.js#L131)
- Add in command-line option to use or not display helpers
