import React from 'react';
import TextSlider from '../components/Contentslider';
import style from '../styles/tekstcontent.module.css';
import oversigt from '../assets/img/oversigt.png'; 

const Tekst = () => {
  const textContent = [
  // Side 1: tekst
  <>
    <p>
      Platons hulelignelse finder vi i dialogen »Staten«. Her giver Platon også en beskrivelse af »idealstaten«. Det vil sige en tænkt mønsterstat – eller det vi kalder en »utopisk« stat. I al korthed kan vi sige at Platon mener staten bør styres af filosoferne. Når han skal forklare hvorfor, tager han udgangspunkt i hvordan det enkelte menneske er opbygget.
    </p>
    <p>
      Ifølge Platon er menneskets krop delt i tre dele, nemlig hoved, bryst og underliv. Til hver af disse tre dele svarer også en sjæls-evne. Til hovedet hører fornuften, til brystet viljen og til underlivet lysten eller begæret. Til alle de tre sjælsevner hører der desuden et ideal eller en »dyd«. Fornuften skal stræbe efter visdom, viljen skal udvise mod og begæret bør tøjles, så mennesket viser må­dehold. Først når menneskets tre dele fungerer sammen som en helhed, får vi et harmonisk eller »retskaffent« menneske. I skolen skal børnene først lære at tøjle begæret, dernæst skal modet udvikles. Til sidst skal fornuften hjælpe til med at opnå visdom.
        Platon tænker sig nu en stat der er opbygget præcis på samme måde som et menneske – og med nøjagtig den samme tre­deling.
    </p>
  </>,

  // Side 2: tekst
  <>
    <p>
      Sådan som kroppen har »hoved«, »bryst« og »under­liv«, har staten herskere, vogtere (eller soldater) og arbejdere (for eksempel bønder). Her er det tydeligt at Platon bruger den græske lægevidenskab som forbillede. Sådan som et sundt og harmonisk menneske viser balance og mådehold, er en »retfær­dig« stat præget af at hver og en kender sin plads i helheden.
        Som overalt i Platons filosofi er også hans statsfilosofi båret af rationalisme. Det afgørende for at skabe en god stat, er at den styres med fornuft. Som hovedet styrer kroppen, så må det være filosofferne som styrer samfundet.
    </p>
    <p>
      Vi forsøger os med en enkel fremstilling af forholdet mellem mennesket og staten i tre dele:
    </p>
  </>,

  // Side 3: billede 
    <img
        src={oversigt}
        className={style.image}
        alt="Tabel over Platons tredeling"
        style={{ maxWidth: '100%', height: 'auto', margin: '0 auto' }}
    />,
    // Side 4 : tekst
    <>
    <p>
      Platons idealstat kan minde om det gamle indiske kastesystem – hvor hver og en havde sin specielle funktion til bedste for helheden. Helt fra Platons tid – og endnu længere tilbage – har det indiske kastesystem haft den samme tredeling mellem den styrende kaste (eller præstekasten), krigerkasten og den arbejdende kaste.
    </p>
    <p>
      I dag ville vi måske kalde Platons stat for en totalitær stat. Men det er værd at notere sig at han mente at kvinder kunne være statens herskere lige så vel som mænd. Det var lige netop med baggrund i fornuft at herskerne skulle styre en bystat. Han mente at kvinder har nøjagtig den samme fornuft som mænd, hvis de blot får den samme oplæring og desuden frihed fra børnepasning og hjemlige sysler. Og Platon ville afskaffe familie og privat ejendom for herskere og vogtere. Opgaver såsom at bringe børn under alle omstændigheder for vigtig til at være overladt til den enkelte. Det måtte være statens ansvar at opdrage børn. (Han var den første filosof der tog til orde for en offentlig ud­bygning af børnehaver og en heldagsskole.)
    </p>
  </>,
  
    // Side 5 : tekst
    <>
    <p>
      Mens Sofie havde siddet på en træstub og læst om Platon, var solen steget op over skoven i øst. Solskiven var tippet op over horisonten, lige netop som hun læste om Sokrates, der kom klatrende ud af hulen og blev stående og knibe øjnene sammen mod det skarpe lys udenfor.
        Det var næsten som om hun selv var kommet op fra en underjordisk grotte. Sofie syntes i hvert fald at hun så naturen på en helt ny måde efter at have læst om Platon. Det føltes som om hun havde været farveblind. Hun havde set nogle skygger, men hun havde ikke set de klare idéer.
    </p>
    <p>
      Hun var ikke så sikker på om Platon havde ret i alt hvad han havde sagt om de evige mønsterbilleder, men hun syntes det var en smuk tanke at alt levende var ufuldkomne kopier af de evige forme i idéernes verden. For var det ikke sandt at alle blomster og træer, mennesker og dyr var »ufuldkomne«?
    </p>
  </>,

  // Side 6 : tekst
    <>
    <p>
      Alt det hun så omkring sig var så smukt og levende at Sofie syntes hun måtte gnide øjne for rigtigt at fatte det. Men intet af det hun så lige nu ville være ved. Og alligevel – om hundrede år ville de samme blomster og dyr være her på ny. Selv om hver eneste blomst og hvert eneste dyr på denne klode ubønhørligt døde og forsvandt, er det eller andre der »husker« hvordan alt så ud. Sofie stirrede ud over hele skaberværket. med et smuttede et egern op ad en fyrretræsstamme.
    </p>
    <p>
      Det hvirvlede et par gange rundt om stammen og blev så væk mellem grenene. – Dig har jeg set for! tænkte Sofie. Hun var naturligvis klar over at det ikke var det samme e gern hun tidligere havde set, men hun havde set den samme »form«. Efter alt hvad hun vidste, kunne Platon have ret i at hun engang havde set det evige »egern« – i ideernes verden, inden hendes sjæl havde taget bolig i en krop.
    </p>
  </>,

  // Side 7 : tekst
    <>
    <p>
      Kunne det være sandt at hun havde levet for? Havde hendes sjæl eksisteret inden den fik en krop at flytte rundt med? Kunne det være sandt at hun bar på en lille guldklump inden i sig – en juvel som ikke tæredes op af tiden, ja, en sjæl der levede videre, när hendes krop engang blev gammel og døde?
    </p>
  </>,


    ];

  return (
    <div className={style.pageWrapper}>
      <h2 className={style.title}>Filosofistaten</h2>
      <h3 className={style.subtitle}>Af Sofies verden</h3>
      <TextSlider texts={textContent} />
    </div>
  );
};

export default Tekst;