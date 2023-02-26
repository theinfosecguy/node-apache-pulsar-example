function postEvents(arrOfEventObjs) {
  const api_endpoint =
    "https://node-apache-pulsar-example.api.decodable.co/v1alpha2/connections/54a3404f/events";

  const api_token =
    "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Iks3c2hfMVM0OGV0c0RRY2p3M0JKdyJ9.eyJpc3MiOiJodHRwczovL2F1dGguZGVjb2RhYmxlLmNvLyIsInN1YiI6Imdvb2dsZS1vYXV0aDJ8MTEyNjc0NTc1NDU2NTc4NDM1OTMxIiwiYXVkIjpbImh0dHBzOi8vYXBpLmRlY29kYWJsZS5jby8iLCJodHRwczovL2RlY29kYWJsZS51cy5hdXRoMC5jb20vdXNlcmluZm8iXSwiaWF0IjoxNjc2NTczNjIxLCJleHAiOjE2NzY2NjAwMjEsImF6cCI6IllIOWpjSWJ2Z3lscHJMR0F0emtGZ0lxNkQyRDZzS0dtIiwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBhY3RpdmF0ZTpwaXBlbGluZSBhY3RpdmF0ZTpjb25uZWN0aW9uIHJlYWQ6YWNjb3VudCByZWFkOmNvbm5lY3Rpb24gcmVhZDpwaXBlbGluZSByZWFkOnN0cmVhbSB3cml0ZTphY2NvdW50IHdyaXRlOmNvbm5lY3Rpb24gd3JpdGU6cGlwZWxpbmUgd3JpdGU6c3RyZWFtIHdyaXRlOnByZXZpZXcgb2ZmbGluZV9hY2Nlc3MiLCJvcmdfaWQiOiJvcmdfc0p3YWZRV25MWk90dmNKOCIsInBlcm1pc3Npb25zIjpbImFjdGl2YXRlOmNvbm5lY3Rpb24iLCJhY3RpdmF0ZTpwaXBlbGluZSIsInJlYWQ6YWNjb3VudCIsInJlYWQ6YmlsbGluZyIsInJlYWQ6Y29ubmVjdGlvbiIsInJlYWQ6cGlwZWxpbmUiLCJyZWFkOnByZXZpZXciLCJyZWFkOnN0cmVhbSIsIndyaXRlOmFjY291bnQiLCJ3cml0ZTpiaWxsaW5nIiwid3JpdGU6Y29ubmVjdGlvbiIsIndyaXRlOnBpcGVsaW5lIiwid3JpdGU6cHJldmlldyIsIndyaXRlOnN0cmVhbSJdfQ.m_FQYg52oi5tVfywB0rwiXM1e4RJY4mECQvHYor1wD_cS9gHnpexzpYa8DN67lWzoazlZjgdWMd_65pg2O3X1PTHPo9lYUG2_U6KpPkqKDrYV6yngbL-kPlu5x2hxu5q_BLHjFchSv4P2NeEJ_WEJ_YhTcSvyWqB0Z4NJ9F0evDvaJLPXicV3gWPloLhRUj-fzSi5rLbqsQIze1QZo2STWtg0Ral1S3EBG21aXs7Htitog7oCSkt_TrzpRwmgshcc1l-I8lo7bpTEX-n4i852Vgpe4FgCgNANBdZB973EGUrzvgBE3vsj5nMtvBB22yaL_SG4FwSLkWhf7N6sf0buA";

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + api_token,
    },
    body: JSON.stringify({ events: arrOfEventObjs }),
  };

  return fetch(api_endpoint, options);
}

const dummyData = [
  {
    name: "Homepage Visit",
    origin: "website",
    type: "page_visit",
  },
  {
    name: "Add to Cart",
    origin: "website",
    type: "add_to_cart",
  },
  {
    name: "Product Purchase",
    origin: "website",
    type: "purchase",
  },
];

// send the dummy data as events, one by one
function sendEvents() {
  // random number between 10 and 20
  const randomBigNum = Math.floor(Math.random() * 5) + 5;

  // random number between 1 and 5
  const randomSmallNum = Math.floor(Math.random() * 3) + 1;

  // send the first event multiple times
  for (let i = 0; i < randomBigNum; i++) {
    postEvents([dummyData[0]]);
  }

  // send the second event multiple but less times than the first event
  for (let i = 0; i < randomBigNum - randomSmallNum; i++) {
    postEvents([dummyData[1]]);
  }

  // send the third event multiple times but less times than the second event
  for (let i = 0; i < randomBigNum - randomSmallNum * 2; i++) {
    postEvents([dummyData[2]]);
  }
}
