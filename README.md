###### NOTES
- i was using the same mysql pool for the app(storing date) and for <br>
express session store, and i faced an issue when using flash. sometimes the message<br>

i was flashing doenn't appear to front, after struggle trying to findout what was the problem<br>

i found out that the set and get methods in MysqlStore were in race condition so one will win the race<br>

before the other. the problem was when get method go before set get empty message which is logic because it didn't found anything,<br>

and this how flash message works, first call set to write message second get the message then set message to empty.<br>

and here how it looks like in mysql logs<br>

```
INSERT INTO sessions (session_id, expires, data) VALUES '_b3de94Y9cf3BlbX4zU2bj7EgxNbs1_T',<br>

 UNIX_TIMESTAMP() + 59, '{\"cookie\":{\"originalMaxAge\":60000,\"expires\":<br>

 \"2021-10-02T09:31:10.995Z\",\"httpOnly\":true,\"path\":\"/\"},\"flash\":<br>

 {\"message\":[\"this is message from\"]}}' ON DUPLICATE KEY UPDATE expires=VALUES(expires), data=VALUES(data)<br>

SELECT data FROM sessions WHERE `session_id` = '_b3de94Y9cf3BlbX4zU2bj7EgxNbs1_T' AND expires > UNIX_TIMESTAMP()<br>

INSERT INTO sessions (session_id, expires, data) VALUES '_b3de94Y9cf3BlbX4zU2bj7EgxNbs1_T',<br>

 UNIX_TIMESTAMP() + 60, '{\"cookie\":{\"originalMaxAge\":60000,\"expires\":<br>

 \"2021-10-02T09:31:11.059Z\",\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}' <br>

 ON DUPLICATE KEY UPDATE expires=VALUES(expires), data=VALUES(data)<br>

```
the solution was to make another pool for MysqlStore and set connectionLimit to 1
instead of 10 for app pool 
