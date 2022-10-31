# Creating your Discord Bot
1. Visit https://discord.com/developers/applications.
2. Press the `New Application` button in the top right after logging in.
3. Give the bot a name, check the box, and press `Create`.
4. On the left side navigation, press `Bot`.
5. Click the `Add Bot` button, then `Yes, do it!`.
6. Copy your bot token (keep it handy for the `Installation` category) and DO NOT SHARE IT WITH ANYONE!!!
7. At the bottom of this page, enable all three `Privileged Gateway Intents`.
8. On the left side navigation, press `OAuth2`, then `URL Generator`.
9. Check off the following options: https://i.imgur.com/AcYp8Zc.png
10. Copy the generated url at the bottom, paste it into a new tab, and invite your bot!

# Installation
1. Copy the script into a resource folder. Either place it in a folder that is already ensured or add `ensure boppe-discord` to your `server.cfg`.
2. Open `config.json`:
   1. Paste your discord bot token into line 2.
   2. Paste your discord server id into line 3.
   3. If you would not like logs to be sent, set line 4 to `false`.
   4. If you have line 4 set to true, paste the channel id for your logs in line 5.
   5. Add the role names of who should have access onto line 6.
   6. If you'd like to whitelist only certain discord accounts, add their discord id onto line 7.