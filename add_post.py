import datetime, pytz, sqlite3

minutes_worked = input("How many minutes of work done today?: ")
post_content = input("Enter post content now: ")

tz = pytz.timezone("US/Eastern")
local_time = datetime.datetime.now(tz)
post_time = local_time.strftime("%b. %-d, %Y, %-I:%M %p")

con = sqlite3.connect('db.sqlite3')
cur = con.cursor()
cur.execute("insert into blog_post(post_time, hours_worked, post_content) values ('" + post_time + "', '" + minutes_worked + "', '" + post_content + "')")

con.commit()
con.close()
