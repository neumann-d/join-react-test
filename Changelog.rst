:desc: join-react-test Changelog


join-react-test Changelog
===========================

[0.3.4] - 2020-04-27
^^^^^^^^^^^^^^^^^^^^

Improvements
------------
- Make email not a required field in CandidateView
- Add id property to Candidate type and use it in candidates map as key (instead of email)


[0.3.3] - 2020-04-27
^^^^^^^^^^^^^^^^^^^^

Improvements
------------
- Add "hired" candidate state

Bugfixes
------------
- Fix wrong number of candidates in RecruiterView's title (deleted candidates should not count)


[0.3.2] - 2020-04-27
^^^^^^^^^^^^^^^^^^^^

Improvements
------------
- Integrate Redux to share global candidates state across multiple components
- Change app title to "join-react-test"

Bugfixes
------------
- Fix wrong tab highlighting after redirect from CandidateView to RecruiterView when new candidate was created


[0.3.1] - 2020-04-27
^^^^^^^^^^^^^^^^^^^^

Improvements
------------
- Show bigger loading bar
- Refactoring: make CandidateCard a stateless component, remove unused imports


[0.3.0] - 2020-04-26
^^^^^^^^^^^^^^^^^^^^

Improvements
------------
- Candidate View: Add input form elements and avatar uploader, create a new Candidate on form submit
- Recruiter View: Increase Avatar size
- Refactoring: Move tests into `__test__` directory


[0.2.0] - 2020-04-26
^^^^^^^^^^^^^^^^^^^^

Improvements
------------
- Fetch initial candidates from API (https://candidates.free.beeceptor.com/api/candidate) if available, otherwise from `/candidates.json`
- Store candidate list in local browser storage to persist them
- Recruiter View: Show candidate card list with menu to change state and delete (hide them from list) functions
- Candidate View: Show coming soon message


[0.1.0] - 2020-04-25
^^^^^^^^^^^^^^^^^^^^

Improvements
------------
- Basic setup: TypeScript React App with Material-UI Design, ESLint/Prettier Config, Jest Unit Tests, Firebase Deployment
