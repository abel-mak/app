###### NOTES
### flash with session
i was using the same mysql pool for the app(storing date) and for <br>
express-session store, and i faced an issue when using flash. sometimes the message<br>
i was flashing doesn't appear to frontend, after struggling trying to findout what was the problem<br>
i found out that the set and get methods in MysqlStore were in race condition so one will win the race<br>
before the other. the problem was when get method go before the set gets empty message which is logic because,<br>
nothing is inserted yet, and this how flash message works, firstly call the set to write message, secondly get the message then set message to empty.<br>
and here how it looks like in mysql logs<br>
```
INSERT INTO sessions (session_id, expires, data) VALUES '_b3de94Y9cf3BlbX4zU2bj7EgxNbs1_T',

 UNIX_TIMESTAMP() + 59, '{\"cookie\":{\"originalMaxAge\":60000,\"expires\":

 \"2021-10-02T09:31:10.995Z\",\"httpOnly\":true,\"path\":\"/\"},\"flash\":

 {\"message\":[\"this is message from\"]}}' ON DUPLICATE KEY UPDATE expires=VALUES(expires), data=VALUES(data)

SELECT data FROM sessions WHERE `session_id` = '_b3de94Y9cf3BlbX4zU2bj7EgxNbs1_T' AND expires > UNIX_TIMESTAMP()

INSERT INTO sessions (session_id, expires, data) VALUES '_b3de94Y9cf3BlbX4zU2bj7EgxNbs1_T',

 UNIX_TIMESTAMP() + 60, '{\"cookie\":{\"originalMaxAge\":60000,\"expires\":

 \"2021-10-02T09:31:11.059Z\",\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}' 

 ON DUPLICATE KEY UPDATE expires=VALUES(expires), data=VALUES(data)

```
the solution was to make another pool for MysqlStore and set connectionLimit to 1
instead of 10 like app pool 
