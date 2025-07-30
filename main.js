// Taylor-Francis:  read code from excel https://www.tandfonline.com/action/doSearch?target=titleSearch&SeriesKey=cthe
//Sage: column in excel conatins links
//Wiley: already contains url
//Springer: https://research.com/journal/American-Journal-of-Sexuality-Education
import { wiley_journals } from './publishers_open_access_journals.js';
import { sage_choice_journals } from './publishers_open_access_journals.js';
import { sage_gold_journals } from './publishers_open_access_journals.js';
import { taylor_francis_journals } from './publishers_open_access_journals.js';
import { springer_journals } from './publishers_open_access_journals.js';
import { oxford_journals } from './publishers_open_access_journals.js';
import { elsevier_journals } from './publishers_open_access_journals.js';

const journalPublishers = [
  { name: "Wiley Journals", journals: wiley_journals },
  { name: "Sage Choice Journals", journals: sage_choice_journals },
  { name: "Sage Gold Journals", journals: sage_gold_journals },
  { name: "Taylor Francis Journals", journals: taylor_francis_journals },
  { name: "Springer Journals", journals: springer_journals },
  { name: "Oxford Journals", journals: oxford_journals },
  { name: "Elsevier Journals", journals: elsevier_journals },
];



document.getElementById('searchInput').addEventListener('input', function() {
  //let num_results = 0;
  //let num_results = document.getElementById('number_results');
  //num_results.innerHTML = `Results: ${num_results++}`
  const searchTerm = this.value.toLowerCase();
  const resultsList = document.getElementById('searchResults');
  const publisherName = document.getElementById('publisherName');
  publisherName.innerHTML = '';
  resultsList.innerHTML = '';

  if (searchTerm.trim() === '') {
    return;
  }

  let publisherResultsFound = false; // Flag to track if any publisher had results

  journalPublishers.forEach((publisher, index) => {
    const filteredJournals = publisher.journals.filter(journal =>
      journal.toLowerCase().includes(searchTerm)
    );

    if (filteredJournals.length > 0 && searchTerm.length > 3) {
      publisherResultsFound = true; // Set flag to true
     
      // Add publisher title
      const publisherTitle = document.createElement('li');
      publisherTitle.textContent = publisher.name;
    
      publisherTitle.style.fontWeight = 'bold';
      resultsList.appendChild(publisherTitle);

      // Add line break between the title and results
      const lineBreak = document.createElement('div');
      lineBreak.style.marginTop = '5px';
      resultsList.appendChild(lineBreak);

      filteredJournals.forEach(journal => {
        const listItem = document.createElement('li');
        listItem.innerHTML = create_link(journal);
        if(publisher.name =="Taylor Francis Journals"){
          listItem.innerHTML += `<span style="font-size:12px; margin-left:50px; font-style: italic;">(Free publishing, max 9 yearly publications)</span>`;
        }
        else if(publisher.name == "Springer Journals"){
         listItem.innerHTML += `<span style="font-size:12px; margin-left:50px; font-style: italic;">(Free publishing, max 3 yearly publications)</span>`;
        }
        else if(publisher.name =="Wiley Journals" ){
          listItem.innerHTML += `<span style="font-size:12px; margin-left:50px; font-style: italic;">(Free publishing)</span>`;
        }
        else if(publisher.name == "Sage Choice Journals"){
         listItem.innerHTML += `<span style="font-size:12px; margin-left:50px; font-style: italic;">(Publication cost: £200)</span>`
        }
        else if(publisher.name == "Sage Gold Journals"){
         listItem.innerHTML += `<span style="font-size:12px; margin-left:50px; font-style: italic;">(Publication cost discount: 20%)</span>`
        }
        else if(publisher.name == "Elsevier Journals"){
         listItem.innerHTML += `<span style="font-size:12px; margin-left:50px; font-style: italic;">(Free publishing, max 6 yearly publications)</span>`
        }
        else if(publisher.name == "Oxford Journals"){
         listItem.innerHTML += `<span style="font-size:12px; margin-left:50px; font-style: italic;">(Free publishing)</span>`
        }
        resultsList.appendChild(listItem);
      });

      // Add three line breaks between publishers (except after the last one)
      if (index < journalPublishers.length - 1) { // Check if it's not the last publisher
        for (let i = 0; i < 1; i++) {
          const publisherLineBreak = document.createElement('div');
          publisherLineBreak.style.marginTop = '50px';
          resultsList.appendChild(publisherLineBreak);
        }
      }
    }
  });

  // Display "No results" if nothing was found
  if (!publisherResultsFound) {
    const noResults = document.createElement('li');
    noResults.textContent = 'No matching journals found.';
    resultsList.appendChild(noResults);
  }
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function create_link(journal) {
    const encodedJournalName = encodeURIComponent(journal);
    const encodedSearchTerm = encodeURIComponent("journal");
    const googleSearchUrl = `https://www.google.com/search?q=${encodedJournalName}+${encodedSearchTerm}`;
    return `<a href="${googleSearchUrl}" target="_blank" style="text-decoration: none;">${journal}</a>`

}
