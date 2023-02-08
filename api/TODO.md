# GoalFlags TODO

## Register Form
- [ ] Add company sector field [type="text"] free to know what type of company is
- [X] Change greater need How would you like goalflags to help you?
- [X] Add greater needs to 32 chars min
- [ ] add pet logo (like golang) and use its eyes to follow cursor and react to register actions
- [ ] in mobile the how goal flags can help you message is so big
  - you may change GoalFlags to we

## Company Users
- [X] (API) return company users **sorted by name**
- [ ] max 1000 users by company in free plan
- [ ] allows email sort on table
- [ ] save all users with default state `pending`
  - pending means (add tooltip to explain this) invite was successful sended, is pending to user accepts invite and start session
- [ ] allows search filter by name and email in the same input
- [ ] allows filter by state

## Invite Users
- [ ] prevent invite same company email
- [ ] support Excel format
- [ ] support google sheets or other common format to upload

## Web Application
- [ ] implement [vitesse](https://github.com/antfu/vitesse)
- [ ] add vitesse layout to one by one page and by file users invitations
  - this to prevent `userList` component re-load on change page
- [ ] fix router redirect add page URL in different `company-home` pages

## Table Component
- [ ] improve load more items button to a best experience

## Login
- [ ] add users ip in login secrets config in order to prevent theft of JWT token 
  - [ ] you may store common ip addresses used in order to prevent identity thefts

## Register Request
- [ ] save phone picker country selected on register process
