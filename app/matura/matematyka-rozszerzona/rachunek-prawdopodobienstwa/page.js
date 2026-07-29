"use client";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import {TaskCard, Mi, Mb, FormulaBox, sortTasksBySourceDate, getDisplayNumber} from "../_components";

// ─── Zadania ──────────────────────────────────────────────────

const SOURCE_CKE_CZERWIEC_2025_DOD =
  "Matura z matematyki, CKE, czerwiec 2025, poziom rozszerzony, termin dodatkowy";

const SOURCE_CKE_MAJ_2025 =
  "Matura z matematyki, CKE, maj 2025, poziom rozszerzony";

const SOURCE_CKE_F2023 =
  "Matura z matematyki, CKE, maj 2026, poziom rozszerzony, formuła 2023, arkusz z 11 maja 2023";
const SOURCE_PROBNA_PL_MARZEC_2025 =
  "Matura próbna z matematyki, Politechnika Łódzka, marzec 2025, poziom rozszerzony";

const SOURCE_CKE_MOCK_GRUDZIEN_2024 =
  "Matura próbna z matematyki, CKE, grudzień 2024, poziom rozszerzony";

const tasks = [
  {
    id: "cke-mock-2024-grudzien-zad5-niemiecki-warunkowe",
    source: SOURCE_CKE_MOCK_GRUDZIEN_2024,
    number: "5",
    points: "0–3",
    instruction: (
      <div className="space-y-3">
        <p>
          W pewnej lokalnej społeczności <Mi>{"35\\%"}</Mi> osób ma wyższe wykształcenie. W tej społeczności
          językiem niemieckim dobrze włada <Mi>{"70\\%"}</Mi> osób mających wyższe wykształcenie i{" "}
          <Mi>{"40\\%"}</Mi> osób bez wyższego wykształcenia. Spośród członków tej społeczności wybieramy
          losowo jedną osobę.
        </p>
        <p className="font-semibold text-stone-800">
          Oblicz prawdopodobieństwo zdarzenia polegającego na tym, że wybierzemy osobę z wyższym
          wykształceniem, jeżeli wiadomo, że ta osoba dobrze włada językiem niemieckim. Wynik zapisz w postaci
          ułamka dziesiętnego w zaokrągleniu do części setnych. Zapisz obliczenia.
        </p>
      </div>
    ),
    mathBlock: null,
    noteItems: null,
    answers: null,

    answer: (
      <p>
        <Mi>{"0{,}49"}</Mi>
      </p>
    ),

    hint: (
      <div className="space-y-3">
        <p>
          Oznacz: <Mi>{"H"}</Mi> = „osoba ma wyższe wykształcenie”, <Mi>{"G"}</Mi> = „osoba dobrze włada
          niemieckim”. Z treści masz <Mi>{"P(H) = 0{,}35"}</Mi>, <Mi>{"P(G \\mid H) = 0{,}70"}</Mi>,{" "}
          <Mi>{"P(G \\mid H') = 0{,}40"}</Mi>. Szukasz <Mi>{"P(H \\mid G)"}</Mi>.
        </p>
        <FormulaBox>
          <Mb>{"P(H \\mid G) = \\frac{P(H \\cap G)}{P(G)} = \\frac{P(H) \\cdot P(G \\mid H)}{P(G)}"}</Mb>
        </FormulaBox>
        <p>
          Najpierw policz <Mi>{"P(G)"}</Mi> ze wzoru na prawdopodobieństwo całkowite (dwa rozłączne
          przypadki: wyższe wykształcenie albo nie):
        </p>
        <FormulaBox>
          <Mb>{"P(G) = P(H) \\cdot P(G \\mid H) + P(H') \\cdot P(G \\mid H')"}</Mb>
        </FormulaBox>
      </div>
    ),

    solution: (
      <div className="space-y-4">
        <p className="font-semibold text-stone-800">Krok 1. Oznaczenia</p>
        <p>
          Niech <Mi>{"H"}</Mi> oznacza zdarzenie: wylosowana osoba ma wyższe wykształcenie, a <Mi>{"G"}</Mi>:
          dobrze włada językiem niemieckim. Z treści zadania:
        </p>
        <Mb>{"P(H) = 0{,}35, \\qquad P(H') = 1 - 0{,}35 = 0{,}65"}</Mb>
        <Mb>{"P(G \\mid H) = 0{,}70, \\qquad P(G \\mid H') = 0{,}40"}</Mb>
        <p>
          Pytanie dotyczy prawdopodobieństwa <strong>warunkowego</strong> (wiemy już, że osoba włada
          niemieckim):
        </p>
        <FormulaBox>
          <Mb>{"P(H \\mid G) = \\frac{P(H \\cap G)}{P(G)}"}</Mb>
        </FormulaBox>

        <p className="font-semibold text-stone-800">Krok 2. Prawdopodobieństwo zdarzenia <Mi>{"G"}</Mi></p>
        <p>
          Osoba albo ma wyższe wykształcenie, albo nie (zdarzenia rozłączne i wyczerpujące), więc:
        </p>
        <FormulaBox>
          <Mb>{"P(G) = P(H) \\cdot P(G \\mid H) + P(H') \\cdot P(G \\mid H')"}</Mb>
        </FormulaBox>
        <Mb>
          {
            "P(G) = 0{,}35 \\cdot 0{,}70 + 0{,}65 \\cdot 0{,}40 = 0{,}245 + 0{,}26 = 0{,}505"
          }
        </Mb>

        <p className="font-semibold text-stone-800">Krok 3. Część wspólna <Mi>{"H \\cap G"}</Mi></p>
        <p>
          Osoba ma wyższe wykształcenie <strong>i</strong> włada niemieckim. Korzystamy z definicji
          prawdopodobieństwa warunkowego:
        </p>
        <Mb>{"P(H \\cap G) = P(H) \\cdot P(G \\mid H) = 0{,}35 \\cdot 0{,}70 = 0{,}245"}</Mb>

        <p className="font-semibold text-stone-800">Krok 4. Prawdopodobieństwo warunkowe</p>
        <Mb>
          {
            "P(H \\mid G) = \\frac{P(H \\cap G)}{P(G)} = \\frac{0{,}245}{0{,}505} = \\frac{245}{505} = \\frac{49}{101}"
          }
        </Mb>
        <p>
          Jako ułamek dziesiętny (zaokrąglenie do setnych): <Mi>{"\\dfrac{49}{101} \\approx 0{,}4851\\ldots"}</Mi>,
          cyfra tysięcznych to <Mi>{"5"}</Mi>, więc:
        </p>
        <Mb>{"P(H \\mid G) \\approx 0{,}49"}</Mb>
      </div>
    ),
  },

  {
    id: "cke-2025-maj-zad4-kostka-warunkowe",
    source: SOURCE_CKE_MAJ_2025,
    number: "4",
    points: "0–3",
    instruction: (
      <div className="space-y-3">
        <p>
          Doświadczenie losowe polega na czterokrotnym rzucie symetryczną sześcienną kostką do gry, która na
          każdej ściance ma inną liczbę oczek – od jednego oczka do sześciu oczek.
        </p>
        <p className="font-semibold">
          Oblicz prawdopodobieństwo zdarzenia polegającego na tym, że otrzymamy co najmniej jeden raz sześć
          oczek, pod warunkiem że otrzymamy dokładnie dwa razy pięć oczek. Zapisz obliczenia.
        </p>
      </div>
    ),
    mathBlock: null,
    noteItems: null,
    answers: null,

    answer: (
      <p>
        <Mi>{"\\dfrac{9}{25}"}</Mi>
      </p>
    ),

    hint: (
      <div className="space-y-3">
        <p>
          To jest <strong>prawdopodobieństwo warunkowe</strong>. Oznacz: <Mi>{"A"}</Mi> = „co najmniej jedna
          szóstka”, <Mi>{"B"}</Mi> = „dokładnie dwie piątki”. Szukasz <Mi>{"P(A|B)"}</Mi>.
        </p>
        <FormulaBox>
          <Mb>{"P(A|B) = \\frac{|A \\cap B|}{|B|}"}</Mb>
        </FormulaBox>
        <p>
          Każdy ciąg czterech wyników rzutu jest jednakowo prawdopodobny (kostka symetryczna). Policz najpierw,
          ile jest ciągów spełniających <Mi>{"B"}</Mi>, a potem ile z nich spełnia też <Mi>{"A"}</Mi>.
        </p>
        <p>
          Przy dokładnie dwóch piątkach: wybierz 2 pozycje na piątki (<Mi>{"\\binom{4}{2}"}</Mi>). Na pozostałych
          dwóch nie może być piątki (5 możliwości na każdą). Dla <Mi>{"A"}</Mi> na tych dwóch pozycjach musi
          wypaść przynajmniej jedna szóstka.
        </p>
      </div>
    ),

    solution: (
      <div className="space-y-4">
        <p className="font-semibold text-stone-800">Krok 1. Przestrzeń zdarzeń elementarnych</p>
        <p>
          Rzucamy kostką <Mi>{"4"}</Mi> razy. Każdy wynik to jedno z <Mi>{"6"}</Mi> oczek, więc każdy ciąg
          czterech wyników (np. <Mi>{"(3,5,1,6)"}</Mi>) jest jednym zdarzeniem elementarnym. Kostka jest
          symetryczna, więc wszystkie <Mi>{"6^4 = 1296"}</Mi> ciągów są jednakowo prawdopodobne.
        </p>

        <p className="font-semibold text-stone-800">Krok 2. Zdarzenia A i B</p>
        <p>
          <Mi>{"B"}</Mi>: dokładnie dwa razy wypada pięć oczek.
        </p>
        <p>
          <Mi>{"A"}</Mi>: co najmniej jeden raz wypada sześć oczek.
        </p>
        <p>
          Szukamy prawdopodobieństwa <Mi>{"A"}</Mi> <strong>pod warunkiem</strong> <Mi>{"B"}</Mi>:
        </p>
        <FormulaBox>
          <Mb>{"P(A|B) = \\frac{P(A \\cap B)}{P(B)} = \\frac{|A \\cap B|}{|B|}"}</Mb>
        </FormulaBox>
        <p>
          W liczniku i mianowniku liczymy <strong>liczbę ciągów</strong> (zdarzeń elementarnych), bo każdy ciąg
          ma to samo prawdopodobieństwo <Mi>{"\\left(\\frac{1}{6}\\right)^4"}</Mi>, więc skraca się w ułamku.
        </p>

        <p className="font-semibold text-stone-800">Krok 3. Ile ciągów spełnia warunek B?</p>
        <p>
          Musimy mieć dokładnie <Mi>{"2"}</Mi> piątki. Wybieramy, na których <Mi>{"2"}</Mi> z <Mi>{"4"}</Mi>{" "}
          rzutów wypadnie piątka:
        </p>
        <Mb>{"\\binom{4}{2} = 6"}</Mb>
        <p>
          Na pozostałych <Mi>{"2"}</Mi> rzutach <strong>nie może</strong> być piątki (inaczej byłoby więcej niż
          dwie piątki). Na każdym z tych rzutów może wypaść: <Mi>{"1, 2, 3, 4"}</Mi> lub <Mi>{"6"}</Mi>, czyli{" "}
          <Mi>{"5"}</Mi> możliwości:
        </p>
        <Mb>{"5 \\cdot 5 = 25"}</Mb>
        <FormulaBox>
          <Mb>{"|B| = \\binom{4}{2} \\cdot 5^2 = 6 \\cdot 25 = 150"}</Mb>
        </FormulaBox>

        <p className="font-semibold text-stone-800">Krok 4. Ile ciągów spełnia A ∩ B?</p>
        <p>
          Nadal dokładnie <Mi>{"2"}</Mi> piątki (<Mi>{"\\binom{4}{2} = 6"}</Mi> sposobów na ich pozycje). Na
          dwóch pozostałych rzutach musi być <strong>co najmniej jedna szóstka</strong> i nadal nie może być
          piątki.
        </p>
        <p>
          <strong>Metoda dopełnienia</strong> (wygodna, gdy „co najmniej jeden”): policz wszystkie ciągi z{" "}
          <Mi>{"B"}</Mi>, a potem odejmij te, w których <strong>nie ma</strong> szóstki.
        </p>
        <p>
          Ciągi z <Mi>{"B"}</Mi> bez szóstki: na dwóch wolnych pozycjach tylko <Mi>{"1, 2, 3, 4"}</Mi> (4
          możliwości na rzut):
        </p>
        <Mb>{"\\binom{4}{2} \\cdot 4^2 = 6 \\cdot 16 = 96"}</Mb>
        <p>
          Zatem ciągów z <Mi>{"B"}</Mi>, w których jest co najmniej jedna szóstka:
        </p>
        <FormulaBox>
          <Mb>{"|A \\cap B| = 150 - 96 = 54"}</Mb>
        </FormulaBox>

        <p className="font-semibold text-stone-800">Krok 5. Prawdopodobieństwo warunkowe</p>
        <Mb>{"P(A|B) = \\frac{|A \\cap B|}{|B|} = \\frac{54}{150} = \\frac{9}{25}"}</Mb>

        <div className="mt-2 pt-3 border-t border-[#e0d0f8]">
          <p className="font-semibold text-stone-800">
            Odpowiedź: <Mi>{"\\dfrac{9}{25}"}</Mi>
          </p>
        </div>
      </div>
    ),
  },

  {
    id: "cke-2025-czerwiec-dod-zad1-bernoulli",
    source: SOURCE_CKE_CZERWIEC_2025_DOD,
    number: "1",
    points: "0–3",
    instruction: (
      <div className="space-y-3">
        <p>
          Sklep AGD prowadzi sprzedaż wysyłkową pralek. Prawdopodobieństwo uszkodzenia podczas transportu
          pralki wysłanej przez ten sklep do klienta jest równe <Mi>{"0{,}02"}</Mi>.
        </p>
        <p>
          Oblicz prawdopodobieństwo zdarzenia <Mi>{"A"}</Mi> polegającego na tym, że spośród{" "}
          <Mi>{"10"}</Mi> pralek wysłanych dziesięciu klientom przez ten sklep <strong>co najwyżej jedna</strong>{" "}
          ulegnie uszkodzeniu podczas transportu. Wynik zapisz w postaci ułamka dziesiętnego w zaokrągleniu do
          części tysięcznych. Zapisz obliczenia.
        </p>
      </div>
    ),
    mathBlock: null,
    noteItems: null,
    answers: null,

    answer: (
      <p>
        <Mi>{"P(A) \\approx 0{,}984"}</Mi>
      </p>
    ),

    hint: (
      <div className="space-y-3">
        <p>
          Każda pralka to niezależna próba z dwoma wynikami: uszkodzenie (prawdopodobieństwo{" "}
          <Mi>{"p = 0{,}02"}</Mi>) lub brak uszkodzenia (<Mi>{"q = 1 - p = 0{,}98"}</Mi>). Masz{" "}
          <Mi>{"n = 10"}</Mi> takich prób, więc to <strong>schemat Bernoulliego</strong>.
        </p>
        <p>
          „Co najwyżej jedna” uszkodzona oznacza: albo <Mi>{"0"}</Mi>, albo dokładnie <Mi>{"1"}</Mi> uszkodzona
          pralka:
        </p>
        <Mb>{"P(A) = P_{10}(0) + P_{10}(1)"}</Mb>
        <p>Wzór na prawdopodobieństwo dokładnie <Mi>{"k"}</Mi> sukcesów w <Mi>{"n"}</Mi> próbach:</p>
        <FormulaBox>
          <Mb>{"P_n(k) = \\binom{n}{k} \\cdot p^k \\cdot q^{n-k}"}</Mb>
        </FormulaBox>
        <p>
          Tu „sukces” to uszkodzenie w transporcie. Policz <Mi>{"P_{10}(0)"}</Mi> i <Mi>{"P_{10}(1)"}</Mi>, dodaj
          wyniki i zaokrąglij do trzech miejsc po przecinku.
        </p>
      </div>
    ),

    solution: (
      <div className="space-y-4">
        <p className="font-semibold text-stone-800">Krok 1. Rozpoznajemy schemat Bernoulliego</p>
        <p>
          Wysyłamy <Mi>{"n = 10"}</Mi> pralek. Dla każdej pralki transport jest osobną, niezależną próbą z dwoma
          wynikami: uszkodzenie (prawdopodobieństwo <Mi>{"p = 0{,}02"}</Mi>) lub brak uszkodzenia (
          <Mi>{"q = 1 - p = 0{,}98"}</Mi>). To jest schemat Bernoulliego.
        </p>
        <p>
          Niech <Mi>{"X"}</Mi> oznacza liczbę uszkodzonych pralek spośród dziesięciu. Zdarzenie{" "}
          <Mi>{"A"}</Mi> („co najwyżej jedna uszkodzona”) to:
        </p>
        <Mb>{"A = \\{X = 0\\} \\cup \\{X = 1\\}"}</Mb>
        <p>
          Zdarzenia <Mi>{"\\{X=0\\}"}</Mi> i <Mi>{"\\{X=1\\}"}</Mi> są rozłączne, więc:
        </p>
        <Mb>{"P(A) = P(X=0) + P(X=1) = P_{10}(0) + P_{10}(1)"}</Mb>

        <p className="font-semibold text-stone-800">Krok 2. Schemat Bernoulliego</p>
        <p>
          Prawdopodobieństwo dokładnie <Mi>{"k"}</Mi> sukcesów (tu: uszkodzeń) w <Mi>{"n"}</Mi> próbach Bernoulliego:
        </p>
        <FormulaBox>
          <Mb>{"P_n(k) = \\binom{n}{k} \\cdot p^k \\cdot q^{n-k}"}</Mb>
        </FormulaBox>
        <p>
          Symbol <Mi>{"\\binom{n}{k}"}</Mi> to liczba sposobów wyboru <Mi>{"k"}</Mi> pralek spośród{" "}
          <Mi>{"n"}</Mi>, które ulegną uszkodzeniu (pozostałe będą sprawne).
        </p>

        <p className="font-semibold text-stone-800">Krok 3. Prawdopodobieństwo, że żadna pralka nie ulegnie uszkodzeniu</p>
        <p>
          Dla <Mi>{"k = 0"}</Mi> mamy <Mi>{"\\binom{10}{0} = 1"}</Mi> oraz <Mi>{"p^0 = 1"}</Mi>:
        </p>
        <Mb>
          {"P_{10}(0) = \\binom{10}{0} \\cdot 0{,}02^0 \\cdot 0{,}98^{10} = 1 \\cdot 1 \\cdot 0{,}98^{10} = 0{,}98^{10}"}
        </Mb>
        <Mb>{"0{,}98^{10} \\approx 0{,}817073"}</Mb>

        <p className="font-semibold text-stone-800">Krok 4. Prawdopodobieństwo, że dokładnie jedna pralka ulegnie uszkodzeniu</p>
        <p>
          Dla <Mi>{"k = 1"}</Mi> mamy <Mi>{"\\binom{10}{1} = 10"}</Mi> (wybieramy, która z dziesięciu pralek jest
          uszkodzona):
        </p>
        <Mb>
          {"P_{10}(1) = \\binom{10}{1} \\cdot 0{,}02^1 \\cdot 0{,}98^{9} = 10 \\cdot 0{,}02 \\cdot 0{,}98^{9}"}
        </Mb>
        <Mb>{"= 0{,}2 \\cdot 0{,}98^{9} \\approx 0{,}2 \\cdot 0{,}833748 \\approx 0{,}166750"}</Mb>

        <p className="font-semibold text-stone-800">Krok 5. Sumujemy i zaokrąglamy</p>
        <Mb>{"P(A) = P_{10}(0) + P_{10}(1) \\approx 0{,}817073 + 0{,}166750 = 0{,}983823"}</Mb>
        <p>
          Zadanie wymaga ułamka dziesiętnego zaokrąglonego do <strong>części tysięcznych</strong> (trzecia cyfra po
          przecinku). Cyfra czwarta to <Mi>{"8 \\geq 5"}</Mi>, więc zaokrąglamy w górę:
        </p>
        <Mb>{"P(A) \\approx 0{,}984"}</Mb>

        <div className="mt-2 pt-3 border-t border-[#e0d0f8]">
          <p className="font-semibold text-stone-800">
            Odpowiedź: <Mi>{"P(A) \\approx 0{,}984"}</Mi>
          </p>
        </div>
      </div>
    ),
  },

  {
    id: "cke-2026-formula2023-maj-zad2-prawdopodobienstwo",
    source: SOURCE_CKE_F2023,
    number: "1",
    points: "0–3",
    instruction: (
      <div className="space-y-3">
        <p>
          Ze zbioru ośmiu liczb <Mi>{"\\{1, 2, 3, 4, 5, 6, 7, 8\\}"}</Mi> losujemy bez zwracania osiem
          razy po jednej liczbie. Wylosowane liczby ustawiamy w ciąg zgodnie z kolejnością losowania.
        </p>
        <p>
          Oblicz prawdopodobieństwo zdarzenia <Mi>{"A"}</Mi> polegającego na tym, że wylosowane liczby
          utworzą ciąg, w którym iloczyn każdych trzech kolejnych wyrazów będzie liczbą podzielną przez{" "}
          <Mi>{"3"}</Mi>. Wynik podaj w postaci nieskracalnego ułamka zwykłego. Zapisz obliczenia.
        </p>
      </div>
    ),
    mathBlock: null,
    noteItems: null,
    answers: null,

    answer: (
      <p>
        <Mi>{"\\dfrac{1}{28}"}</Mi>
      </p>
    ),

    hint: (
      <div className="space-y-3">
        <p>
          W zbiorze <Mi>{"\\{1,\\ldots,8\\}"}</Mi> tylko <Mi>{"3"}</Mi> i <Mi>{"6"}</Mi> są podzielne
          przez <Mi>{"3"}</Mi>. Iloczyn trzech liczb jest podzielny przez <Mi>{"3"}</Mi> wtedy i tylko
          wtedy, gdy przynajmniej jedna z nich dzieli się przez <Mi>{"3"}</Mi>.
        </p>
        <p>
          Masz dokładnie dwie takie „specjalne” liczby w ciągu ośmiu wyrazów, a musisz pokryć sześć
          okien postaci„ <Mi>{"(x_i,x_{i+1},x_{i+2})"}</Mi>”, <Mi>{"i=1,\\ldots,6"}</Mi>. Rozpisz krótko,
          gdzie muszą stać te dwie wartości, żeby w każdym oknie znajdowała się przynajmniej jedna.
        </p>
      </div>
    ),

    solution: (
      <div className="space-y-4">
        <p className="font-semibold text-stone-800">Krok 1. Przestrzeń zdarzeń elementarnych</p>
        <p>
          Losujemy bez zwracania wszystkie osiem liczb i zapisujemy je w kolejności. Każde takie ułożenie
          jest permutacją zbioru ośmiu elementów i jest jednakowo prawdopodobne:
        </p>
        <FormulaBox>
          <Mb>{"|\\Omega| = 8!"}</Mb>
        </FormulaBox>

        <p className="font-semibold text-stone-800">Krok 2. Co znaczy warunek dla podzielności przez 3?</p>
        <p>
          W zbiorze <Mi>{"\\{1,2,\\ldots,8\\}"}</Mi> tylko <Mi>{"3"}</Mi> i <Mi>{"6"}</Mi> mają czynnik
          pierwszy <Mi>{"3"}</Mi>.
        </p>
        <p>
          Produkt trzech dodatnich liczb całkowitych dzieli się przez <Mi>{"3"}</Mi> wtedy i tylko wtedy,
          gdy przynajmniej jedna z trzech dzieli się przez <Mi>{"3"}</Mi>.
          Zdarzenie <Mi>{"A"}</Mi>:
        </p>
        <Mb>
          {"A = \\{\\text{taka permutacja, że dla każdego } i\\in\\{1,2,\\ldots,6\\}\\quad x_i\\cdot x_{i+1}\\cdot x_{i+2}\\equiv 0\\pmod{3}\\}"}
        </Mb>

        <p className="font-semibold text-stone-800">Krok 3. Gdzie muszą stać liczby <Mi>{"3"}</Mi> i <Mi>{"6"}</Mi>?</p>
        <p>
          Jedyną dopuszczalną opcją, która spełnia warunki zadania można przedstawić w postaci wzorca:
        </p>
        <FormulaBox>
          <Mb>{"T = 3\\text{ lub } 6, \\quad N = \\text{reszta liczb od 1 do 8 bez } T\\quad \\implies \\quad (N,N,T,N,N,T,N,N)"}</Mb>
        </FormulaBox>

        <p className="font-semibold text-stone-800">Krok 4. Liczba permutacji sprzyjających zdarzeniu</p>
        <p>
          Na pozycjach <Mi>{"3"}</Mi> oraz <Mi>{"6"}</Mi> ustawiamy wartości <Mi>{"3"}</Mi> i <Mi>{"6"}</Mi>: możemy je zamienić miejscami, czyli
        </p>
        <Mb>{"|\\{\\text{przypisanie dla }3\\text{ i }6\\}| = 2!"}</Mb>
        <p>
          Pozostałe sześć liczb ustawiamy dowolnie na pozycjach <Mi>{"1,2,4,5,7,8"}</Mi>, czyli
        </p>
        <Mb>{"|\\{\\text{ukończenie permutacji}\\}| = 6!"}</Mb>
        <FormulaBox>
          <Mb>{"|A|=2!\\cdot 6!=1440"}</Mb>
        </FormulaBox>

        <p className="font-semibold text-stone-800">Krok 5. Prawdopodobieństwo</p>
        <Mb>{"P(A)=\\frac{|A|}{|\\Omega|}=\\frac{2\\cdot 6!}{8!}=\\frac{2}{8\\cdot 7}=\\frac{2}{56}=\\frac{1}{28}"}</Mb>

        <div className="mt-2 pt-3 border-t border-[#e0d0f8]">
          <p className="font-semibold text-stone-800">
            Odpowiedź: <Mi>{"\\dfrac{1}{28}"}</Mi>
          </p>
        </div>
      </div>
    ),
  },

  {
    id: "smwp-2026-styczen-zad3",
    source: "Matura próbna z matematyki, SMWP, styczeń 2026, poziom rozszerzony",
    number: "2",
    points: "0–3",
    instruction: (
      <div className="space-y-3">
        <p>
          Szkolny turniej gry w siatkówkę składa się z dwóch tur. Pierwsza tura polega
          na rozegraniu przez każdą drużynę 5 meczy. Aby drużyna zakwalifikowała się do
          drugiej tury, musi zwyciężyć w co najmniej 4 meczach. Prawdopodobieństwo
          zwycięstwa w pojedynczym meczu przez drużynę A jest równe{" "}
          <Mi>{"0{,}26"}</Mi>.
        </p>
        <p className="font-semibold">
          Oblicz prawdopodobieństwo zdarzenia polegającego na tym, że drużyna A
          zakwalifikuje się do drugiej tury turnieju. Wynik przedstaw w postaci ułamka
          dziesiętnego, w zaokrągleniu do części setnych. Zapisz obliczenia.
        </p>
      </div>
    ),
    mathBlock: null,
    noteItems: null,
    answers: null,

    answer: (
      <p><Mi>{"P \\approx 0{,}02"}</Mi></p>
    ),

    hint: (
      <div className="space-y-3">
        <p>
          To jest schemat Bernoulliego: <Mi>{"n = 5"}</Mi> niezależnych prób,
          sukces (wygrana) ma prawdopodobieństwo <Mi>{"p = 0{,}26"}</Mi>,
          porażka <Mi>{"q = 1 - p = 0{,}74"}</Mi>.
        </p>
        <p>
          Wzór na prawdopodobieństwo uzyskania dokładnie <Mi>{"k"}</Mi> sukcesów w{" "}
          <Mi>{"n"}</Mi> próbach:
        </p>
        <FormulaBox>
          <Mb>{"P_n(k) = \\binom{n}{k} \\cdot p^k \\cdot q^{n-k}"}</Mb>
        </FormulaBox>
        <p>
          Drużyna kwalifikuje się, gdy <Mi>{"k \\geq 4"}</Mi>, czyli:{" "}
          <Mi>{"P = P_5(4) + P_5(5)"}</Mi>.
        </p>
      </div>
    ),

    solution: (
      <div className="space-y-4">
        {/* ── Metoda 1: Bernoulli ── */}
        <p className="font-bold text-[#52297a] text-base">Metoda 1: schemat Bernoulliego</p>

        <p className="font-semibold text-stone-800">Krok 1. Rozpoznajemy schemat Bernoulliego</p>
        <p>
          Mamy ciąg <Mi>{"n = 5"}</Mi> niezależnych prób (meczów), w każdej próbie
          możliwe są dwa wyniki: sukces (wygrana drużyny A) z prawdopodobieństwem{" "}
          <Mi>{"p = 0{,}26"}</Mi> lub porażka z prawdopodobieństwem{" "}
          <Mi>{"q = 1 - p = 0{,}74"}</Mi>. To jest właśnie schemat Bernoulliego.
        </p>
        <p>
          Drużyna kwalifikuje się, gdy wygra co najmniej 4 mecze, czyli:
        </p>
        <Mb>{"P = P_5(4) + P_5(5)"}</Mb>

        <p className="font-semibold text-stone-800">Krok 2. Wzór Bernoulliego</p>
        <p>
          Prawdopodobieństwo uzyskania dokładnie <Mi>{"k"}</Mi> sukcesów w <Mi>{"n"}</Mi> próbach:
        </p>
        <FormulaBox>
          <Mb>{"P_n(k) = \\binom{n}{k} \\cdot p^k \\cdot q^{n-k}"}</Mb>
        </FormulaBox>

        <p className="font-semibold text-stone-800">Krok 3. Obliczamy <Mi>{"P_5(4)"}</Mi></p>
        <Mb>{"P_5(4) = \\binom{5}{4} \\cdot 0{,}26^4 \\cdot 0{,}74^1 = 5 \\cdot 0{,}00456976 \\cdot 0{,}74 \\approx 0{,}01691"}</Mb>

        <p className="font-semibold text-stone-800">Krok 4. Obliczamy <Mi>{"P_5(5)"}</Mi></p>
        <Mb>{"P_5(5) = \\binom{5}{5} \\cdot 0{,}26^5 \\cdot 0{,}74^0 = 1 \\cdot 0{,}26^5 \\approx 0{,}00119"}</Mb>

        <p className="font-semibold text-stone-800">Krok 5. Sumujemy</p>
        <Mb>{"P = 0{,}01691 + 0{,}00119 = 0{,}01810 \\approx 0{,}02"}</Mb>

        {/* ── Metoda 2 ── */}
        <div className="mt-6 pt-6 border-t-2 border-[#d4bef5]" />
        <p className="font-bold text-[#52297a] text-base">Metoda 2 (alternatywa)</p>

        <p className="font-semibold text-stone-800">Krok 1. Identyfikacja parametrów</p>
        <p>
          Drużyna kwalifikuje się, gdy wygra dokładnie 4 lub dokładnie 5 meczów.
          Oznaczamy: W = wygrana (prawdopodobieństwo <Mi>{"0{,}26"}</Mi>),
          P = porażka (prawdopodobieństwo <Mi>{"0{,}74"}</Mi>).
        </p>

        <p className="font-semibold text-stone-800">Krok 2. Dokładnie 4 wygrane</p>
        <p>
          Porażka może wypaść w meczu 1., 2., 3., 4. lub 5., czyli jest 5 różnych
          ciągów wyników z jedną porażką. Każdy taki ciąg ma prawdopodobieństwo{" "}
          <Mi>{"0{,}26^4 \\cdot 0{,}74"}</Mi>:
        </p>
        <Mb>{"P(\\text{dokładnie 4 wygrane}) = 5 \\cdot 0{,}26^4 \\cdot 0{,}74 \\approx 0{,}01691"}</Mb>

        <p className="font-semibold text-stone-800">Krok 3. Dokładnie 5 wygranych</p>
        <p>
          Jest tylko jeden taki ciąg (wygrane we wszystkich 5 meczach):
        </p>
        <Mb>{"P(\\text{dokładnie 5 wygranych}) = 0{,}26^5 \\approx 0{,}00119"}</Mb>

        <p className="font-semibold text-stone-800">Krok 4. Sumujemy</p>
        <Mb>{"P = 0{,}01691 + 0{,}00119 = 0{,}01810 \\approx 0{,}02"}</Mb>

        <p className="text-stone-500 text-xs mt-1">
          Obie metody dają ten sam wynik, bo <Mi>{"\\binom{5}{4} = 5"}</Mi> to właśnie
          liczba sposobów ustawienia jednej porażki wśród 5 meczów.
        </p>

        <div className="mt-2 pt-3 border-t border-[#e0d0f8]">
          <p className="font-semibold text-stone-800">
            Odpowiedź: <Mi>{"P \\approx 0{,}02"}</Mi>
          </p>
        </div>
      </div>
    ),
  },

  // ── Zadanie 3 ─────────────────────────────────────────────
  {
    id: "smwp-2025-pazdziernik-zad4",
    source: "Matura próbna z matematyki, SMWP, październik 2025, poziom rozszerzony",
    number: "3",
    points: "0–3",
    instruction: (
      <span>
        Franek kupuje porcję lodów. Do wyboru ma osiem smaków: śmietankowy, waniliowy,
        czekoladowy, truskawkowy, ciasteczkowy, miętowy, karmelowy oraz pistacjowy.
        Franek prosi sprzedawcę o nałożenie mu dokładnie czterech gałek o losowo
        wybranym smaku. Oblicz prawdopodobieństwo zdarzenia polegającego na tym, że
        Franek otrzyma co najmniej dwie gałki spośród smaków: śmietankowego,
        truskawkowego, karmelowego albo pistacjowego, jeżeli wiadomo, że Franek
        otrzyma dokładnie jedną gałkę o smaku czekoladowym, oraz żaden smak się nie
        powtórzy. Zapisz obliczenia.
      </span>
    ),
    mathBlock: null,
    noteItems: null,
    answers: null,

    answer: <p><Mi>{"\\dfrac{22}{35}"}</Mi></p>,

    hint: (
      <div className="space-y-3">
        <p>
          Szukasz prawdopodobieństwa warunkowego: przy założeniu, że dokładnie
          jedna gałka to czekolada, wybierasz 3 pozostałe z 7 smaków.
        </p>
        <FormulaBox>
          <Mb>{"P(A|B) = \\frac{|A \\cap B|}{|B|}"}</Mb>
        </FormulaBox>
        <p>
          Spośród 7 smaków (bez czekolady): "specjalne" <Mi>{"\\{\\text{S, T, K, P}\\}"}</Mi> to 4,
          "zwykłe" <Mi>{"\\{\\text{W, Ci, M}\\}"}</Mi> to 3.
        </p>
      </div>
    ),

    solution: (
      <div className="space-y-4">
        <p className="font-semibold text-stone-800">Krok 1. Zdarzenie B (warunek)</p>
        <p>
          B = "dokładnie jedna gałka czekoladowa". Przy 4 gałkach bez powtórzeń:
          wybieramy czekoladę (1 sposób) i 3 spośród pozostałych 7 smaków.
        </p>
        <Mb>{"|B| = \\binom{7}{3} = 35"}</Mb>

        <p className="font-semibold text-stone-800">Krok 2. Zdarzenie A∩B</p>
        <p>
          Smaki "specjalnych": śmietankowy (S), truskawkowy (T), karmelowy (K),
          pistacjowy (P) - łącznie 4. Smaki "zwykłych" (bez czekolady): waniliowy,
          ciasteczkowy, miętowy - łącznie 3.
        </p>
        <p>
          Szukamy: co najmniej 2 z "specjalnych" spośród 3 wylosowanych (bez czekolady).
        </p>
        <p>Dokładnie 2 specjalne + 1 zwykły:</p>
        <Mb>{"\\binom{4}{2}\\cdot\\binom{3}{1} = 6 \\cdot 3 = 18"}</Mb>
        <p>Dokładnie 3 specjalne:</p>
        <Mb>{"\\binom{4}{3}\\cdot\\binom{3}{0} = 4 \\cdot 1 = 4"}</Mb>
        <Mb>{"|A \\cap B| = 18 + 4 = 22"}</Mb>

        <p className="font-semibold text-stone-800">Krok 3. Prawdopodobieństwo warunkowe</p>
        <FormulaBox>
          <Mb>{"P(A|B) = \\frac{|A \\cap B|}{|B|} = \\frac{22}{35}"}</Mb>
        </FormulaBox>
      </div>
    ),
  },

  // ── Matura próbna PŁ marzec 2025 ──────────────────────────
  {
    id: "probna-pl-2025-marzec-zad7-urna-bayes",
    source: SOURCE_PROBNA_PL_MARZEC_2025,
    number: "7",
    points: null,
    instruction: (
      <div className="space-y-3">
        <p>
          Z urny zawierającej <Mi>{"10"}</Mi> białych kul i <Mi>{"4"}</Mi> czarne kule
          wyjęto jedną kulę i odłożono, nie oglądając jej. Następnie wylosowano <Mi>{"3"}</Mi> kule.
        </p>
        <p>a) Oblicz prawdopodobieństwo, że były to białe kule.</p>
        <p>
          b) Jakie jest prawdopodobieństwo, że usunięta na początku kula była czarna, jeżeli
          wiadomo, że trzy wylosowane kule są białe?
        </p>
      </div>
    ),
    mathBlock: null,
    noteItems: null,
    answers: null,

    answer: (
      <div className="space-y-1">
        <p>a) <Mi>{"\\dfrac{30}{91}"}</Mi></p>
        <p>b) <Mi>{"\\dfrac{4}{11}"}</Mi></p>
      </div>
    ),

    hint: (
      <div className="space-y-3">
        <p>
          Nie wiemy, jaka kula została odłożona, więc rozpatrujemy dwa scenariusze: odłożono
          białą (prawdopodobieństwo <Mi>{"\\tfrac{10}{14}"}</Mi>) albo czarną
          (<Mi>{"\\tfrac{4}{14}"}</Mi>). W każdym z nich skład urny jest inny.
        </p>
        <p>W punkcie a) użyj wzoru na prawdopodobieństwo całkowite. W punkcie b) zastosuj wzór
          na prawdopodobieństwo warunkowe:</p>
        <FormulaBox>
          <Mb>{"P(A \\mid B) = \\frac{P(A \\cap B)}{P(B)}"}</Mb>
        </FormulaBox>
      </div>
    ),

    solution: (
      <div className="space-y-4">
        <p className="font-semibold text-stone-800">Oznaczenia</p>
        <p>
          W urnie jest <Mi>{"10"}</Mi> białych i <Mi>{"4"}</Mi> czarne kule (<Mi>{"14"}</Mi> łącznie).
          Odłożona kula jest nieznana, więc rozpatrujemy dwa przypadki:
        </p>
        <ul className="list-disc list-inside space-y-1 ml-1">
          <li><Mi>{"B_1"}</Mi> - odłożono białą: <Mi>{"P(B_1) = \\dfrac{10}{14} = \\dfrac{5}{7}"}</Mi></li>
          <li><Mi>{"C_1"}</Mi> - odłożono czarną: <Mi>{"P(C_1) = \\dfrac{4}{14} = \\dfrac{2}{7}"}</Mi></li>
        </ul>

        <p className="font-semibold text-stone-800 mt-4">Punkt a)</p>
        <p>
          Niech <Mi>{"W"}</Mi> oznacza zdarzenie „wylosowano 3 białe kule" z pozostałych{" "}
          <Mi>{"13"}</Mi> kul. Liczymy prawdopodobieństwa warunkowe:
        </p>
        <p>
          Jeśli odłożono białą, w urnie zostaje <Mi>{"9"}</Mi> białych i <Mi>{"4"}</Mi> czarne:
        </p>
        <Mb>{"P(W \\mid B_1) = \\frac{\\binom{9}{3}}{\\binom{13}{3}} = \\frac{84}{286} = \\frac{42}{143}"}</Mb>
        <p>
          Jeśli odłożono czarną, w urnie zostaje <Mi>{"10"}</Mi> białych i <Mi>{"3"}</Mi> czarne:
        </p>
        <Mb>{"P(W \\mid C_1) = \\frac{\\binom{10}{3}}{\\binom{13}{3}} = \\frac{120}{286} = \\frac{60}{143}"}</Mb>

        <p>Prawdopodobieństwo całkowite:</p>
        <FormulaBox>
          <Mb>{"P(W) = P(B_1) \\cdot P(W \\mid B_1) + P(C_1) \\cdot P(W \\mid C_1)"}</Mb>
        </FormulaBox>
        <Mb>
          {"P(W) = \\frac{5}{7} \\cdot \\frac{42}{143} + \\frac{2}{7} \\cdot \\frac{60}{143} = \\frac{210}{1001} + \\frac{120}{1001} = \\frac{330}{1001} = \\frac{30}{91}"}
        </Mb>

        <p className="font-semibold text-stone-800 mt-4">Punkt b)</p>
        <p>
          Szukamy <Mi>{"P(C_1 \\mid W)"}</Mi>. Korzystamy ze wzoru na prawdopodobieństwo warunkowe:
        </p>
        <FormulaBox>
          <Mb>{"P(C_1 \\mid W) = \\frac{P(C_1 \\cap W)}{P(W)}"}</Mb>
        </FormulaBox>
        <p>
          Wartość <Mi>{"P(W)"}</Mi> znamy z punktu a). Natomiast{" "}
          <Mi>{"P(C_1 \\cap W)"}</Mi> to prawdopodobieństwo, że odłożono czarną <strong>i</strong>{" "}
          wylosowano 3 białe, czyli jeden ze składników, które już policzyliśmy:
        </p>
        <Mb>{"P(C_1 \\cap W) = P(C_1) \\cdot P(W \\mid C_1) = \\frac{2}{7} \\cdot \\frac{60}{143} = \\frac{120}{1001}"}</Mb>
        <p>Podstawiamy:</p>
        <Mb>
          {"P(C_1 \\mid W) = \\frac{\\dfrac{120}{1001}}{\\dfrac{30}{91}} = \\frac{120}{1001} \\cdot \\frac{91}{30} = \\frac{120}{330} = \\frac{4}{11}"}
        </Mb>

        <div className="mt-2 pt-3 border-t border-[#e0d0f8]">
          <p className="font-semibold text-stone-800">
            Odpowiedź: a) <Mi>{"\\dfrac{30}{91}"}</Mi>, b) <Mi>{"\\dfrac{4}{11}"}</Mi>
          </p>
        </div>
      </div>
    ),
  },
];

// ─── Strona ───────────────────────────────────────────────────

export default function RachunekPrawdopodobienstwaPage() {
  return (
    <div className="min-h-screen bg-[#fffeeb] text-stone-800">
      {/* Top bar */}
      <div className="border-b border-stone-200 bg-white/90 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-5 h-14 flex items-center gap-4">
          <Link
            href="/matura/matematyka-rozszerzona"
            className="flex items-center gap-2 text-sm text-[#6d3a8e] hover:text-[#52297a] transition-colors"
          >
            <ArrowLeft size={15} /> Matematyka PR
          </Link>
          <span className="text-stone-300">|</span>
          <span className="text-sm text-stone-400">Rachunek prawdopodobieństwa i statystyka</span>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-5 py-16">
        <div className="mb-14">
          <p className="text-sm font-semibold text-[#6d3a8e] uppercase tracking-widest mb-2">
            Dział 17
          </p>
          <h1 className="font-display text-4xl md:text-5xl text-stone-800 mb-4">
            Rachunek prawdopodobieństwa i statystyka
          </h1>
          <p className="text-stone-500 text-lg max-w-xl leading-relaxed">
            {tasks.length} {tasks.length === 1 ? "zadanie" : tasks.length < 5 ? "zadania" : "zadań"}
          </p>
        </div>

        <div className="space-y-12">
          {sortTasksBySourceDate(tasks).map((task, index) => (
            <TaskCard key={task.id} {...task} number={getDisplayNumber(index)} />
          ))}
        </div>
      </main>
    </div>
  );
}
