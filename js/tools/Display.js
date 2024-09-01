function Display(__store) {

   return {
      displayRank: function (hisNew = 0) {

         const tbody = document.querySelector('#ranks');
         const table = tbody.parentNode;
         table.removeChild(tbody);
         const newTbody = document.createElement('tbody');
         newTbody.id = "ranks";
         table.append(newTbody);

         __store.all.sort((a, b)=>a.speed - b.speed).forEach(function (user, i) {

            const tr = document.createElement('tr');

            // hightlight new entry
            if(hisNew && hisNew == user.id)
               tr.className = "table-light";

            const thRank = document.createElement('th');
            thRank.scope = 'row';
            thRank.appendChild(document.createTextNode(i+1));

            const tdPressision = document.createElement('td');
            tdPressision.appendChild(document.createTextNode(user.pressision));

            const tdPseudo = document.createElement('td');
            tdPseudo.appendChild(document.createTextNode(user.pseudo));

            const tdSpeed = document.createElement('td');
            tdSpeed.appendChild(document.createTextNode(user.speed));

            const tdTxt = document.createElement('td');
            tdTxt.appendChild(document.createTextNode(user.title));

            // const tdError = document.createElement('td');
            // tdError.appendChild(document.createTextNode(user.error));

            tr.appendChild(thRank);
            tr.appendChild(tdPseudo);
            tr.appendChild(tdSpeed);
            tr.appendChild(tdPressision);
            tr.appendChild(tdTxt);
            // tr.appendChild(tdError);

            document.querySelector('#ranks').appendChild(tr);
         });

      },

      displayText: function (words) {
         const game = document.getElementById('game');
         let gameGrid = [];

         words.forEach(function (word, i) {
            const divWord = document.createElement('DIV');
            divWord.className = 'word';

            const letters = [...word];
            letters.forEach(function (char) {
               //put each letters in word
               const div = document.createElement('DIV');
               div.className = 'letter';
               div.appendChild(document.createTextNode(char));
               divWord.appendChild(div);

               //add new letter to global grid
               gameGrid.push(div);
            });

            //put space before word
            if (i < words.length - 1) {
               const divSpace = document.createElement('DIV');
               divSpace.className = 'letter';
               divSpace.appendChild(document.createTextNode(' '))
               divWord.appendChild(divSpace);

               //add space to global grid
               gameGrid.push(divSpace);
            }

            //put word in game
            game.appendChild(divWord);

         });

         return gameGrid;
      }
   }
}