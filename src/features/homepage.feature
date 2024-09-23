Feature: Homepage functionality

Scenario: User does random actions on the selenium demo page
Given the user is on the homepage
When the user opens the hover dropdown
Then the hover dropdown should have 3 elements
Given the select dropdown is open
When the user selects option 50
Then the meter bar should be updated accordingly
