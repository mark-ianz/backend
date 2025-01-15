export const GET_USER_ACCOUNT_INFO = `SELECT 
a.account_id, 
a.username, 
a.email, 
ui.user_info_id, 
ui.first_name, 
ui.middle_name, 
ui.last_name, 
ui.gender, 
ui.birthdate, 
ui.phone_number 
FROM account AS a 
INNER JOIN user_info AS ui 
ON ui.user_info_id = a.user_info_id
WHERE username = ?`;