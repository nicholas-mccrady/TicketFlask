*****************************
feature add ins needed 
****************************
Things to add to check list

save to pdf button  , open and edit button , and a print button
(will need to setup sharepoint save and open locations on first time boot configuration)
(will also need to design the form to keep at or under 300kb per pdf and with 42 fields with meta data json barely tips the scales at 5kb per file this design is for space considerations for 1000 pdf checklists)

kent production apps , chrome and adobe check and install

***************************
FAQs and common questions
****************************
Q: So i finalized my check list, why cant I go back and edit it ?
A: This is done so that the check list integrity can be preserved and somone cant go back in and change your data on the form later, if you need to make a change you will need to go back into the checklist portal and open it from there from the share archive and then open it to make any changes
Conclusion: the file saves in two places , once as a pdf file when you finalize it and once as a JSON file in a protected sharepoint location so that if you absolutley had to you can pull that data back in and edit and make changes.