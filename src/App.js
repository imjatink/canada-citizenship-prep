import { useState, useEffect, useCallback } from "react";

// ============================================================
// COMPLETE QUESTION BANK — 500 questions across 20 categories
// ============================================================
const QUESTION_BANK = [
  // ── SET 1: Rights & Responsibilities ──────────────────────
  { id:1, set:1, category:"Rights & Responsibilities", question:"What are three responsibilities of citizenship?", options:["Being loyal to Canada, recycling, serving in the navy","Obeying the law, taking responsibility for oneself and family, serving on a jury","Learning both official languages, voting in elections, belonging to a union","Buying Canadian products, owning your own business, using less water"], answer:1 },
  { id:2, set:1, category:"Rights & Responsibilities", question:"Which of the following is a right of Canadian citizens?", options:["The right to own a business","The right to vote in federal elections","The right to free housing","The right to a guaranteed income"], answer:1 },
  { id:3, set:1, category:"Rights & Responsibilities", question:"What document protects the rights and freedoms of Canadians?", options:["The Bill of Rights","The Canadian Charter of Rights and Freedoms","The Constitution Act 1867","The Magna Carta"], answer:1 },
  { id:4, set:1, category:"Rights & Responsibilities", question:"What is one of the four fundamental freedoms in Canada?", options:["Freedom to own weapons","Freedom of conscience and religion","Freedom from taxation","Freedom from military service"], answer:1 },
  { id:5, set:1, category:"Rights & Responsibilities", question:"Who is entitled to vote in Canadian federal elections?", options:["Any person living in Canada","Canadian citizens 18 years or older","Permanent residents over 18","Anyone who pays taxes"], answer:1 },
  { id:6, set:1, category:"Rights & Responsibilities", question:"What is the duty of every Canadian when summoned?", options:["Join the military","Serve on a jury","Pay federal income tax","Learn French"], answer:1 },
  { id:7, set:1, category:"Rights & Responsibilities", question:"Freedom of peaceful assembly is guaranteed by which document?", options:["The Royal Proclamation","The Canadian Charter of Rights and Freedoms","The Indian Act","The BNA Act"], answer:1 },
  { id:8, set:1, category:"Rights & Responsibilities", question:"Which right can only be exercised by Canadian citizens?", options:["Freedom of speech","The right to vote in federal elections","The right to trial by jury","Freedom of religion"], answer:1 },
  { id:9, set:1, category:"Rights & Responsibilities", question:"What does 'equality rights' mean in Canada?", options:["Everyone earns the same income","Everyone is equal before the law regardless of race, sex, or disability","All provinces have equal power","All votes have equal monetary value"], answer:1 },
  { id:10, set:1, category:"Rights & Responsibilities", question:"Which year was the Canadian Charter of Rights and Freedoms enacted?", options:["1867","1965","1982","1995"], answer:2 },
  { id:11, set:1, category:"Rights & Responsibilities", question:"What does freedom of the press mean in Canada?", options:["The press can print money","The media can report news without government censorship","Newspapers are free of charge","All media must be Canadian-owned"], answer:1 },
  { id:12, set:1, category:"Rights & Responsibilities", question:"Which of the following is NOT a responsibility of Canadian citizens?", options:["Obeying the law","Serving on a jury","Owning a home","Voting in elections"], answer:2 },
  { id:13, set:1, category:"Rights & Responsibilities", question:"What are mobility rights in Canada?", options:["The right to drive a car","The right to move within Canada and live or work anywhere","The right to free public transit","The right to own a boat"], answer:1 },
  { id:14, set:1, category:"Rights & Responsibilities", question:"What language rights does the Charter protect?", options:["The right to speak any language at work","Rights relating to English and French as official languages","The right to be educated in any language","The right to interpret for others"], answer:1 },
  { id:15, set:1, category:"Rights & Responsibilities", question:"Aboriginal peoples in Canada have special rights under which section of the Constitution?", options:["Section 7","Section 15","Section 35","Section 91"], answer:2 },
  { id:16, set:1, category:"Rights & Responsibilities", question:"Which of the following best describes a Canadian citizen's responsibility regarding taxes?", options:["Pay taxes only when asked","File tax returns and pay owed taxes","Taxes are optional","Only business owners pay taxes"], answer:1 },
  { id:17, set:1, category:"Rights & Responsibilities", question:"What is the right to a fair trial in Canada based on?", options:["The legal system assumes guilt","The accused is innocent until proven guilty","Judges decide guilt without jury","Only citizens have this right"], answer:1 },
  { id:18, set:1, category:"Rights & Responsibilities", question:"Which of the following is a democratic right in Canada?", options:["The right to own property","The right to run as a candidate in elections","The right to free education","The right to a job"], answer:1 },
  { id:19, set:1, category:"Rights & Responsibilities", question:"What does the term 'rule of law' mean?", options:["The government can make any law it wants","Everyone including the government must follow the law","Only citizens must follow laws","Laws only apply to adults"], answer:1 },
  { id:20, set:1, category:"Rights & Responsibilities", question:"Freedom of thought, belief, opinion and expression is protected by which document?", options:["The Indian Act","The British North America Act","The Canadian Charter of Rights and Freedoms","The Magna Carta"], answer:2 },
  { id:21, set:1, category:"Rights & Responsibilities", question:"Which branch of government protects the rights of citizens?", options:["The executive branch","The legislative branch","The judicial branch","The municipal branch"], answer:2 },
  { id:22, set:1, category:"Rights & Responsibilities", question:"What is the age of majority for voting in Canada?", options:["16","17","18","21"], answer:2 },
  { id:23, set:1, category:"Rights & Responsibilities", question:"In Canada, are you obliged to tell others how you voted?", options:["Yes, voting records are public","No, voting is by secret ballot","Only if asked by the government","Only in provincial elections"], answer:1 },
  { id:24, set:1, category:"Rights & Responsibilities", question:"What does 'human rights' mean in Canada?", options:["Rights only for Canadian-born citizens","Basic rights and freedoms for all people","Rights earned through employment","Rights only available to adults"], answer:1 },
  { id:25, set:1, category:"Rights & Responsibilities", question:"Which of the following is a legal obligation for Canadian citizens?", options:["Serving in the military","Learning French","Obeying the law","Owning a home"], answer:2 },

  // ── SET 2: Canadian History ────────────────────────────────
  { id:26, set:2, category:"Canadian History", question:"When did Canada become a country (Confederation)?", options:["July 1, 1867","July 1, 1879","January 1, 1901","July 4, 1776"], answer:0 },
  { id:27, set:2, category:"Canadian History", question:"Who was Canada's first Prime Minister?", options:["Wilfrid Laurier","John A. Macdonald","Alexander Mackenzie","Robert Borden"], answer:1 },
  { id:28, set:2, category:"Canadian History", question:"What is the significance of the Canadian Pacific Railway?", options:["It was the world's first railway","It symbolized the opening of the West and united Canada","It was built by Indigenous peoples","It was a military railway"], answer:1 },
  { id:29, set:2, category:"Canadian History", question:"Which year did Canada gain full independence with the Statute of Westminster?", options:["1867","1919","1931","1949"], answer:2 },
  { id:30, set:2, category:"Canadian History", question:"Who were the first inhabitants of Canada?", options:["French settlers","British colonists","Aboriginal peoples","Vikings"], answer:2 },
  { id:31, set:2, category:"Canadian History", question:"What was the 'Quiet Revolution' in Quebec?", options:["A peaceful farming movement","A period of rapid social and political change in Quebec in the 1960s","A military coup","A religious revival"], answer:1 },
  { id:32, set:2, category:"Canadian History", question:"In which war did Canadian forces fight at Vimy Ridge?", options:["World War II","The Boer War","World War I","The Korean War"], answer:2 },
  { id:33, set:2, category:"Canadian History", question:"What does 'Confederation' mean?", options:["A type of government","The joining together of provinces to form Canada","A military alliance","A trade agreement"], answer:1 },
  { id:34, set:2, category:"Canadian History", question:"Who was Sir Wilfrid Laurier?", options:["Canada's first French-Canadian Prime Minister","A Famous general","The first Governor General","A Father of Confederation"], answer:0 },
  { id:35, set:2, category:"Canadian History", question:"Which province joined Confederation last (among original provinces)?", options:["British Columbia","Manitoba","Prince Edward Island","Newfoundland and Labrador"], answer:3 },
  { id:36, set:2, category:"Canadian History", question:"What is 'responsible government'?", options:["A government that balances the budget","A government responsible to the elected legislature, not the king","A monarchy","A type of republic"], answer:1 },
  { id:37, set:2, category:"Canadian History", question:"Who discovered insulin, saving millions of lives?", options:["Alexander Graham Bell and Thomas Edison","Sir Frederick Banting and Charles Best","Marie Curie and Louis Pasteur","Norman Bethune"], answer:1 },
  { id:38, set:2, category:"Canadian History", question:"What was the significance of the Battle of Vimy Ridge?", options:["Canada lost the battle","All four Canadian divisions fought together for the first time","It was fought in Canada","It ended World War II"], answer:1 },
  { id:39, set:2, category:"Canadian History", question:"What year did Newfoundland join Confederation?", options:["1905","1931","1949","1967"], answer:2 },
  { id:40, set:2, category:"Canadian History", question:"Who was Louis Riel?", options:["A Prime Minister","A leader of the Métis people who fought for their rights","A British general","An explorer"], answer:1 },
  { id:41, set:2, category:"Canadian History", question:"Which war saw the largest Canadian military effort in history?", options:["World War I","World War II","The Korean War","The Boer War"], answer:1 },
  { id:42, set:2, category:"Canadian History", question:"What event is 'D-Day' associated with?", options:["The Japanese attack on Pearl Harbor","The Allied invasion of Normandy in 1944","The end of World War I","The dropping of atomic bombs"], answer:1 },
  { id:43, set:2, category:"Canadian History", question:"What did John Cabot do in 1497?", options:["Founded Quebec City","Explored the east coast of Canada for England","Signed the Treaty of Paris","Established the Hudson's Bay Company"], answer:1 },
  { id:44, set:2, category:"Canadian History", question:"What is the Hudson's Bay Company known for?", options:["Building railways","The fur trade and one of Canada's oldest businesses","Banking","Fishing"], answer:1 },
  { id:45, set:2, category:"Canadian History", question:"Who was Samuel de Champlain?", options:["The first Prime Minister","The founder of New France and Quebec City","A British general","An Indigenous leader"], answer:1 },
  { id:46, set:2, category:"Canadian History", question:"What was the Underground Railroad in Canada?", options:["The first subway system","A network helping enslaved people escape to freedom in Canada","A mining operation","A trade route"], answer:1 },
  { id:47, set:2, category:"Canadian History", question:"In which year was the Constitution Act (previously the BNA Act) passed?", options:["1837","1867","1905","1931"], answer:1 },
  { id:48, set:2, category:"Canadian History", question:"What does the 'Plains of Abraham' refer to?", options:["A farming region","The decisive battle where Britain defeated France in 1759","An Indigenous territory","A national park"], answer:1 },
  { id:49, set:2, category:"Canadian History", question:"What is the significance of 1885 in Canadian history?", options:["Confederation occurred","The Canadian Pacific Railway was completed","World War I began","Women received the vote"], answer:1 },
  { id:50, set:2, category:"Canadian History", question:"What year did women gain the right to vote in federal elections?", options:["1867","1897","1918","1929"], answer:2 },

  // ── SET 3: Canadian Government ────────────────────────────
  { id:51, set:3, category:"Canadian Government", question:"What are the three branches of Canada's government?", options:["Federal, provincial, municipal","Legislative, executive, judicial","Monarchy, senate, commons","Prime minister, cabinet, senate"], answer:1 },
  { id:52, set:3, category:"Canadian Government", question:"What is the role of the Governor General?", options:["Leads the army","Represents the King and carries out constitutional duties","Makes all laws","Runs federal departments"], answer:1 },
  { id:53, set:3, category:"Canadian Government", question:"How many members are in the House of Commons?", options:["105","308","338","265"], answer:2 },
  { id:54, set:3, category:"Canadian Government", question:"What is the Senate also called?", options:["The Lower House","The House of Commons","The Upper House","The House of Lords"], answer:2 },
  { id:55, set:3, category:"Canadian Government", question:"Who forms the government after a federal election?", options:["The party with the most seats in the House of Commons","The party that wins the most votes","The party the Governor General chooses","The party with the oldest leader"], answer:0 },
  { id:56, set:3, category:"Canadian Government", question:"What is the role of the Prime Minister?", options:["Head of state","Head of government and leader of the party in power","Commander of the military","Governor of a province"], answer:1 },
  { id:57, set:3, category:"Canadian Government", question:"How are senators chosen in Canada?", options:["Elected by Canadians","Appointed by the Governor General on advice of the Prime Minister","Appointed by provincial premiers","Chosen by the Supreme Court"], answer:1 },
  { id:58, set:3, category:"Canadian Government", question:"What is a 'constituency' in Canada?", options:["A type of law","An electoral district represented by an MP","A type of government committee","A provincial boundary"], answer:1 },
  { id:59, set:3, category:"Canadian Government", question:"What is a majority government in Canada?", options:["When one party wins more than 50% of the seats","When one party wins all seats","When two parties form a coalition","When the PM wins the most votes"], answer:0 },
  { id:60, set:3, category:"Canadian Government", question:"What is the role of His/Her Majesty's Loyal Opposition?", options:["Support all government bills","Critically examine the government and offer alternatives","Run the Senate","Appoint judges"], answer:1 },
  { id:61, set:3, category:"Canadian Government", question:"What is Parliament composed of?", options:["The Prime Minister and Cabinet","The King, the Senate, and the House of Commons","The Supreme Court and Cabinet","The Premier and Legislature"], answer:1 },
  { id:62, set:3, category:"Canadian Government", question:"What is a 'bill' in the Canadian legislature?", options:["A financial debt","A proposed law","A government report","A type of election form"], answer:1 },
  { id:63, set:3, category:"Canadian Government", question:"What is a 'riding' in Canada?", options:["An equestrian sport","A federal electoral district","A provincial boundary","A type of constituency meeting"], answer:1 },
  { id:64, set:3, category:"Canadian Government", question:"What does it mean that Canada is a 'constitutional monarchy'?", options:["The King rules alone","The King is head of state but power is exercised by elected officials","There is no elected government","The King appoints the Prime Minister"], answer:1 },
  { id:65, set:3, category:"Canadian Government", question:"Who is Canada's head of state?", options:["The Prime Minister","The Governor General","The King","The Chief Justice"], answer:2 },
  { id:66, set:3, category:"Canadian Government", question:"What are the three levels of government in Canada?", options:["City, county, province","Federal, provincial/territorial, municipal","National, regional, local","Executive, legislative, judicial"], answer:1 },
  { id:67, set:3, category:"Canadian Government", question:"What does the House of Commons do?", options:["Appoints judges","Represents the people and passes federal laws","Reviews laws passed by the Senate","Manages provincial affairs"], answer:1 },
  { id:68, set:3, category:"Canadian Government", question:"What is a 'vote of non-confidence'?", options:["A vote on a new law","A vote that can force the government to resign or call an election","A vote to appoint a senator","A municipal vote"], answer:1 },
  { id:69, set:3, category:"Canadian Government", question:"What does a Member of Parliament (MP) do?", options:["Runs a provincial ministry","Represents constituents in the House of Commons","Appoints provincial judges","Manages city services"], answer:1 },
  { id:70, set:3, category:"Canadian Government", question:"What does the Cabinet do?", options:["Manages the Senate","Consists of ministers who help the PM run the government","Passes all laws independently","Represents the provinces"], answer:1 },
  { id:71, set:3, category:"Canadian Government", question:"What is 'federalism' in Canada?", options:["Government by a federation of states","Division of powers between federal and provincial governments","All power held by the federal government","Rule by a council of premiers"], answer:1 },
  { id:72, set:3, category:"Canadian Government", question:"What is the role of provincial governments?", options:["Manage national defence","Handle areas like education, health, and roads","Appoint senators","Control immigration"], answer:1 },
  { id:73, set:3, category:"Canadian Government", question:"How long can a senator serve?", options:["For life","Until age 75","10 years","5 year renewable terms"], answer:1 },
  { id:74, set:3, category:"Canadian Government", question:"What is the role of the Supreme Court of Canada?", options:["Makes laws","The highest court that settles legal disputes and interprets the Constitution","Appoints all judges","Manages the prison system"], answer:1 },
  { id:75, set:3, category:"Canadian Government", question:"What is the 'Speech from the Throne'?", options:["The PM's address to Parliament","The King or Governor General's address outlining the government's agenda","A senate statement","A chief justice address"], answer:1 },

  // ── SET 4: Federal Elections ───────────────────────────────
  { id:76, set:4, category:"Federal Elections", question:"How often must a federal election be held in Canada?", options:["Every 2 years","Every 4 years (at least)","Every 5 years (at most)","Every 6 years"], answer:2 },
  { id:77, set:4, category:"Federal Elections", question:"What is a 'polling station'?", options:["A place to file taxes","A place where voters cast their ballots","A government office","A place for political debates"], answer:1 },
  { id:78, set:4, category:"Federal Elections", question:"What does 'first past the post' mean in elections?", options:["The first candidate to register wins","The candidate with the most votes in a riding wins","The party with the most national votes wins","The oldest candidate wins"], answer:1 },
  { id:79, set:4, category:"Federal Elections", question:"Who is responsible for running federal elections in Canada?", options:["The Prime Minister","Elections Canada","The Governor General","The Supreme Court"], answer:1 },
  { id:80, set:4, category:"Federal Elections", question:"Which of the following can run as a candidate in a federal election?", options:["Any Canadian citizen 18 or older","Any resident of Canada","Any taxpayer","Any adult with a university degree"], answer:0 },
  { id:81, set:4, category:"Federal Elections", question:"What is a 'voter registration card'?", options:["An ID card for federal elections","A notification that you are on the voters list","A card to apply for citizenship","A party membership card"], answer:1 },
  { id:82, set:4, category:"Federal Elections", question:"What is a minority government in Canada?", options:["A government led by a minority group","When no party wins a majority of seats","When a small province leads","When the PM is from a minority community"], answer:1 },
  { id:83, set:4, category:"Federal Elections", question:"What is the purpose of a federal election?", options:["Choose a new King","Elect Members of Parliament","Appoint senators","Select the Governor General"], answer:1 },
  { id:84, set:4, category:"Federal Elections", question:"What does it mean to 'advance vote'?", options:["Voting early before election day","Voting twice","Voting online","Voting by phone"], answer:0 },
  { id:85, set:4, category:"Federal Elections", question:"Which of these groups CANNOT vote in Canadian federal elections?", options:["Citizens living abroad","Citizens in prison","Non-citizen permanent residents","None, all above can vote"], answer:2 },
  { id:86, set:4, category:"Federal Elections", question:"What is a political party in Canada?", options:["An organization seeking to form the government","A social club","A private business group","A religious organization"], answer:0 },
  { id:87, set:4, category:"Federal Elections", question:"What does 'dissolution of Parliament' mean?", options:["Parliament is abolished permanently","Parliament is ended to call an election","Parliament takes a vacation","A bill is defeated"], answer:1 },
  { id:88, set:4, category:"Federal Elections", question:"Who can the Governor General ask to form a government?", options:["The leader of any party","The leader of the party with the most seats","Only the leader of the winning party","The last Prime Minister"], answer:1 },
  { id:89, set:4, category:"Federal Elections", question:"What is a 'by-election'?", options:["An election held between scheduled federal elections to fill a vacant seat","A provincial election","A municipal election","An election for senators"], answer:0 },
  { id:90, set:4, category:"Federal Elections", question:"What is the voters list?", options:["A list of political party members","A list of eligible voters prepared for elections","A list of candidates","A list of all MPs"], answer:1 },
  { id:91, set:4, category:"Federal Elections", question:"How is the leader of a political party chosen?", options:["By the voters in an election","By party members","By the Governor General","By the Prime Minister"], answer:1 },
  { id:92, set:4, category:"Federal Elections", question:"What right can a candidate exercise after an election if they believe the result was unfair?", options:["Call another election","Request a judicial recount","Appoint themselves winner","Appeal to the Governor General"], answer:1 },
  { id:93, set:4, category:"Federal Elections", question:"What is the minimum age to vote in Canada?", options:["16","17","18","19"], answer:2 },
  { id:94, set:4, category:"Federal Elections", question:"Is voting in Canada mandatory?", options:["Yes, failure to vote is a crime","No, voting is a right not an obligation","Yes, but only in federal elections","No, but it is required for citizenship"], answer:1 },
  { id:95, set:4, category:"Federal Elections", question:"What does a candidate need to run in a federal election?", options:["A university degree","Canadian citizenship and at least 18 years of age","A party nomination only","Permission from the PM"], answer:1 },
  { id:96, set:4, category:"Federal Elections", question:"What is the role of Elections Canada?", options:["Count provincial votes","Administer federal elections independently and impartially","Determine election winners","Set election campaign rules"], answer:1 },
  { id:97, set:4, category:"Federal Elections", question:"What happens if no party wins a majority?", options:["The election is held again","A minority government may be formed or parties may form a coalition","The Governor General becomes PM","The Senate selects a PM"], answer:1 },
  { id:98, set:4, category:"Federal Elections", question:"What is a 'writ of election'?", options:["A voter registration form","An official document that sets an election in motion","A court order","A candidate's application"], answer:1 },
  { id:99, set:4, category:"Federal Elections", question:"Where do Canadians vote on election day?", options:["Online","At a polling station in their riding","At city hall","At provincial offices"], answer:1 },
  { id:100, set:4, category:"Federal Elections", question:"What is the significance of winning a majority of seats?", options:["The party gets extra funding","The party can govern without relying on other parties to pass laws","The leader becomes Governor General","The party rules for 10 years"], answer:1 },

  // ── SET 5: Justice System ─────────────────────────────────
  { id:101, set:5, category:"Justice System", question:"What is the role of the courts in Canada?", options:["Make laws","Settle disputes and interpret laws","Elect officials","Manage prisons"], answer:1 },
  { id:102, set:5, category:"Justice System", question:"What does 'innocent until proven guilty' mean?", options:["All accused are guilty","The accused does not have to prove innocence; the Crown must prove guilt","Judges decide guilt before trial","Guilt is assumed from evidence alone"], answer:1 },
  { id:103, set:5, category:"Justice System", question:"What is the highest court in Canada?", options:["The Federal Court","The Court of Appeal","The Supreme Court of Canada","The Provincial Superior Court"], answer:2 },
  { id:104, set:5, category:"Justice System", question:"Which of the following is NOT a function of police in Canada?", options:["Maintain peace and order","Prevent crime","Make laws","Enforce laws"], answer:2 },
  { id:105, set:5, category:"Justice System", question:"In Canada, are you allowed to question the police about their service or conduct?", options:["No, police cannot be questioned","Yes, everyone has this right","Only lawyers can question police","Only if you are a citizen"], answer:1 },
  { id:106, set:5, category:"Justice System", question:"What does 'due process' mean in Canada?", options:["Paying dues to a union","The legal requirement to treat citizens fairly under the law","A type of criminal sentence","A court filing fee"], answer:1 },
  { id:107, set:5, category:"Justice System", question:"What is a jury?", options:["A group of judges","A group of citizens who determine guilt in a trial","A government committee","A panel of lawyers"], answer:1 },
  { id:108, set:5, category:"Justice System", question:"What are the two official languages of Canada?", options:["English and Spanish","English and French","French and Indigenous languages","English and Portuguese"], answer:1 },
  { id:109, set:5, category:"Justice System", question:"What is the role of a Crown Attorney?", options:["Defends the accused","Represents the government in criminal prosecutions","Manages prisons","Appoints judges"], answer:1 },
  { id:110, set:5, category:"Justice System", question:"What is 'habeas corpus'?", options:["A Latin phrase for guilty","The right to challenge unlawful detention before a court","A type of search warrant","The right to remain silent"], answer:1 },
  { id:111, set:5, category:"Justice System", question:"What are 'civil' cases in Canadian courts?", options:["Cases involving the military","Disputes between individuals or organizations","Criminal cases involving violence","Cases about government policy"], answer:1 },
  { id:112, set:5, category:"Justice System", question:"What is the difference between a criminal and a civil case?", options:["There is no difference","Criminal cases involve offences against society; civil cases are private disputes","Civil cases involve violence; criminal cases do not","Criminal cases are tried in federal courts only"], answer:1 },
  { id:113, set:5, category:"Justice System", question:"Who appoints Supreme Court judges in Canada?", options:["The Prime Minister recommends and the Governor General appoints","Provincial premiers elect them","They are elected by citizens","The Senate appoints them"], answer:0 },
  { id:114, set:5, category:"Justice System", question:"What is the RCMP?", options:["A provincial police force","The Royal Canadian Mounted Police, Canada's national police force","The military police","A private security firm"], answer:1 },
  { id:115, set:5, category:"Justice System", question:"What does 'legal aid' mean in Canada?", options:["Money given to crime victims","Free or reduced-cost legal services for those who cannot afford a lawyer","Government funding for courts","A type of police assistance"], answer:1 },
  { id:116, set:5, category:"Justice System", question:"What is a 'search warrant'?", options:["A police ID","A court order allowing police to search a specific location","A criminal summons","A public notice"], answer:1 },
  { id:117, set:5, category:"Justice System", question:"What does it mean to be 'on parole'?", options:["Being arrested","Serving time outside prison under conditions after early release","Awaiting trial","A type of community service"], answer:1 },
  { id:118, set:5, category:"Justice System", question:"What are 'provincial courts' responsible for?", options:["Federal criminal cases","Most criminal matters and some civil cases at the provincial level","Constitutional cases","International disputes"], answer:1 },
  { id:119, set:5, category:"Justice System", question:"What is the purpose of the Youth Criminal Justice Act?", options:["Trying adults in youth courts","Providing a separate justice system for young people under 18","Eliminating penalties for youth crime","Establishing youth prisons"], answer:1 },
  { id:120, set:5, category:"Justice System", question:"How many judges sit on the Supreme Court of Canada?", options:["5","7","9","12"], answer:2 },
  { id:121, set:5, category:"Justice System", question:"What is a 'plea'?", options:["A request for money","The accused's formal response (guilty or not guilty) to a charge","A court order","A type of appeal"], answer:1 },
  { id:122, set:5, category:"Justice System", question:"What is an 'appeal'?", options:["Applying for parole","Requesting a higher court to review a lower court's decision","Filing new charges","Starting a civil case"], answer:1 },
  { id:123, set:5, category:"Justice System", question:"What authority do municipal police forces have?", options:["National jurisdiction","Jurisdiction within their municipality only","Provincial jurisdiction","No authority without RCMP support"], answer:1 },
  { id:124, set:5, category:"Justice System", question:"What is the purpose of a 'bail hearing'?", options:["To determine a sentence","To decide whether an accused can be released pending trial","To appoint a lawyer","To select a jury"], answer:1 },
  { id:125, set:5, category:"Justice System", question:"What does 'contempt of court' mean?", options:["Admiring a judge","Disobeying or showing disrespect to a court","Being absent from a trial","Losing a case"], answer:1 },

  // ── SET 6: Canadian Symbols ───────────────────────────────
  { id:126, set:6, category:"Canadian Symbols", question:"What is the national animal of Canada?", options:["The moose","The bear","The beaver","The loon"], answer:2 },
  { id:127, set:6, category:"Canadian Symbols", question:"What is Canada's national anthem?", options:["The Maple Leaf Forever","God Save the King","O Canada","True North Strong"], answer:2 },
  { id:128, set:6, category:"Canadian Symbols", question:"What does the poppy symbolize in Canada?", options:["Spring and renewal","The sacrifice of those who served or died in wars","The beauty of the prairies","Indigenous culture"], answer:1 },
  { id:129, set:6, category:"Canadian Symbols", question:"What are Canada's national colours?", options:["Blue and white","Red and white","Red and green","Green and white"], answer:1 },
  { id:130, set:6, category:"Canadian Symbols", question:"What bird is on the Canadian dollar coin?", options:["The Canada goose","The bald eagle","The loon","The robin"], answer:2 },
  { id:131, set:6, category:"Canadian Symbols", question:"What appears on the Canadian flag?", options:["The beaver","A maple leaf","The loon","The coat of arms"], answer:1 },
  { id:132, set:6, category:"Canadian Symbols", question:"What is the meaning of the maple leaf on Canada's flag?", options:["Canada's forest wealth","A national symbol unifying all Canadians","British heritage","French heritage"], answer:1 },
  { id:133, set:6, category:"Canadian Symbols", question:"When was the current Canadian flag adopted?", options:["1867","1945","1965","1982"], answer:2 },
  { id:134, set:6, category:"Canadian Symbols", question:"What is Canada's official sport?", options:["Ice hockey only","Lacrosse only","Both ice hockey (winter) and lacrosse (summer)","Curling and skiing"], answer:2 },
  { id:135, set:6, category:"Canadian Symbols", question:"What is the Peace Tower?", options:["A monument to World War I","The tower that is part of the Centre Block of Parliament","A lighthouse in Halifax","A war memorial in Ottawa"], answer:1 },
  { id:136, set:6, category:"Canadian Symbols", question:"What is on the Canadian coat of arms?", options:["A moose and a bear","The Royal Arms of England, Scotland, Ireland, and France plus Canadian symbols","Only a maple leaf","A beaver and a loon"], answer:1 },
  { id:137, set:6, category:"Canadian Symbols", question:"What flower is the floral emblem of Canada?", options:["The rose","The daisy","None; provinces have individual emblems","The maple blossom"], answer:3 },
  { id:138, set:6, category:"Canadian Symbols", question:"What is the Order of Canada?", options:["A military rank","The highest civilian honour for outstanding achievement","A government department","A parliamentary order"], answer:1 },
  { id:139, set:6, category:"Canadian Symbols", question:"When is Canada Day celebrated?", options:["June 24","July 1","July 4","August 1"], answer:1 },
  { id:140, set:6, category:"Canadian Symbols", question:"What is Remembrance Day in Canada?", options:["Canada's birthday","A day to honour those who served and died in war (November 11)","The day of Confederation","A day to honour Indigenous peoples"], answer:1 },
  { id:141, set:6, category:"Canadian Symbols", question:"What does the fleur-de-lis symbolize in Canada?", options:["English Canada","French Canada and Quebec heritage","The Royal Family","Indigenous culture"], answer:1 },
  { id:142, set:6, category:"Canadian Symbols", question:"What is Victoria Day in Canada?", options:["The Queen's birthday holiday (Monday before May 25)","A day to celebrate Canadian women","The founding of Victoria, BC","A maritime holiday"], answer:0 },
  { id:143, set:6, category:"Canadian Symbols", question:"What is the significance of the maple leaf in Canada?", options:["It represents only Ontario","It is a national symbol of Canada recognized worldwide","It was chosen by the Queen","It represents the beaver"], answer:1 },
  { id:144, set:6, category:"Canadian Symbols", question:"What is O Canada's significance?", options:["A British song adopted by Canada","Canada's national anthem, officially adopted in 1980","A Quebec provincial anthem","A military march"], answer:1 },
  { id:145, set:6, category:"Canadian Symbols", question:"Which animal appears on the Canadian nickel?", options:["Moose","Loon","Beaver","Bear"], answer:2 },
  { id:146, set:6, category:"Canadian Symbols", question:"What does the Vimy Ridge Memorial symbolize?", options:["Canada's first Olympic gold","Canada's sacrifice in World War I and national identity","Confederation","The end of World War II"], answer:1 },
  { id:147, set:6, category:"Canadian Symbols", question:"What is the significance of the colour red in the Canadian flag?", options:["It represents British heritage","It is one of Canada's national colours","It symbolizes blood spilled in war","It represents French heritage"], answer:1 },
  { id:148, set:6, category:"Canadian Symbols", question:"What is Thanksgiving in Canada?", options:["Celebrated same day as the US","A harvest festival celebrated the second Monday in October","A holiday only in Ontario","A religious holiday only"], answer:1 },
  { id:149, set:6, category:"Canadian Symbols", question:"Who is on the Canadian $20 bill?", options:["The Prime Minister","The reigning King or Queen","John A. Macdonald","Wilfrid Laurier"], answer:1 },
  { id:150, set:6, category:"Canadian Symbols", question:"What is the national motto of Canada?", options:["True North, Strong and Free","A Mari Usque ad Mare (From Sea to Sea)","Peace, Order and Good Government","Liberty, Equality, Fraternity"], answer:1 },

  // ── SET 7: Canadian Geography ─────────────────────────────
  { id:151, set:7, category:"Canadian Geography", question:"How many provinces and territories does Canada have?", options:["10 provinces, 2 territories","10 provinces, 3 territories","9 provinces, 3 territories","10 provinces, 4 territories"], answer:1 },
  { id:152, set:7, category:"Canadian Geography", question:"What are the Atlantic provinces?", options:["Nova Scotia, New Brunswick, PEI, Ontario","New Brunswick, Nova Scotia, PEI, Newfoundland and Labrador","Quebec, New Brunswick, Nova Scotia, PEI","Manitoba, Ontario, Quebec, New Brunswick"], answer:1 },
  { id:153, set:7, category:"Canadian Geography", question:"What is the capital of Canada?", options:["Toronto","Montreal","Ottawa","Vancouver"], answer:2 },
  { id:154, set:7, category:"Canadian Geography", question:"Which is the largest province by area?", options:["Ontario","British Columbia","Alberta","Quebec"], answer:3 },
  { id:155, set:7, category:"Canadian Geography", question:"What ocean borders Canada to the east?", options:["Pacific Ocean","Arctic Ocean","Atlantic Ocean","Indian Ocean"], answer:2 },
  { id:156, set:7, category:"Canadian Geography", question:"Which province is known as the 'Prairie Province' along with Alberta and Saskatchewan?", options:["British Columbia","Ontario","Manitoba","New Brunswick"], answer:2 },
  { id:157, set:7, category:"Canadian Geography", question:"What is the capital of British Columbia?", options:["Vancouver","Victoria","Kelowna","Prince George"], answer:1 },
  { id:158, set:7, category:"Canadian Geography", question:"Which territory has its capital at Whitehorse?", options:["Northwest Territories","Nunavut","Yukon","Labrador"], answer:2 },
  { id:159, set:7, category:"Canadian Geography", question:"What is Canada's longest river?", options:["St. Lawrence River","Fraser River","Mackenzie River","Ottawa River"], answer:2 },
  { id:160, set:7, category:"Canadian Geography", question:"What is the capital of Ontario?", options:["Ottawa","Hamilton","Toronto","London"], answer:2 },
  { id:161, set:7, category:"Canadian Geography", question:"Which province is the only officially bilingual province?", options:["Quebec","Ontario","New Brunswick","Manitoba"], answer:2 },
  { id:162, set:7, category:"Canadian Geography", question:"What is the capital of Quebec?", options:["Montreal","Quebec City","Gatineau","Sherbrooke"], answer:1 },
  { id:163, set:7, category:"Canadian Geography", question:"Which ocean borders Canada to the west?", options:["Atlantic Ocean","Arctic Ocean","Indian Ocean","Pacific Ocean"], answer:3 },
  { id:164, set:7, category:"Canadian Geography", question:"What is the Great Lakes region known for?", options:["Oil production","The largest group of freshwater lakes in the world","Wheat farming","Fishing"], answer:1 },
  { id:165, set:7, category:"Canadian Geography", question:"What is the capital of Alberta?", options:["Calgary","Red Deer","Edmonton","Lethbridge"], answer:2 },
  { id:166, set:7, category:"Canadian Geography", question:"Which province has the largest population?", options:["British Columbia","Quebec","Ontario","Alberta"], answer:2 },
  { id:167, set:7, category:"Canadian Geography", question:"What is the capital of Nova Scotia?", options:["Fredericton","Halifax","Charlottetown","Moncton"], answer:1 },
  { id:168, set:7, category:"Canadian Geography", question:"Which territory's capital is Iqaluit?", options:["Yukon","Northwest Territories","Nunavut","Labrador"], answer:2 },
  { id:169, set:7, category:"Canadian Geography", question:"What is the St. Lawrence River important for?", options:["Oil transport","A major seaway connecting the Great Lakes to the Atlantic","Hydroelectric power only","Drinking water for Ottawa"], answer:1 },
  { id:170, set:7, category:"Canadian Geography", question:"What is the capital of Manitoba?", options:["Brandon","Portage la Prairie","Winnipeg","Thompson"], answer:2 },
  { id:171, set:7, category:"Canadian Geography", question:"What are the Prairie provinces?", options:["Alberta, Saskatchewan, Manitoba","Alberta, Saskatchewan, Ontario","British Columbia, Alberta, Saskatchewan","Manitoba, Ontario, Quebec"], answer:0 },
  { id:172, set:7, category:"Canadian Geography", question:"Which Canadian city is known as 'La Belle Province'?", options:["Montreal","Quebec (the province)","Ottawa","Quebec City"], answer:1 },
  { id:173, set:7, category:"Canadian Geography", question:"What is the capital of Saskatchewan?", options:["Saskatoon","Regina","Prince Albert","Moose Jaw"], answer:1 },
  { id:174, set:7, category:"Canadian Geography", question:"What is the capital of New Brunswick?", options:["Moncton","Saint John","Fredericton","Bathurst"], answer:2 },
  { id:175, set:7, category:"Canadian Geography", question:"What is the capital of Prince Edward Island?", options:["Summerside","Charlottetown","Georgetown","Montague"], answer:1 },

  // ── SET 8: Who Are Canadians? ─────────────────────────────
  { id:176, set:8, category:"Who Are Canadians", question:"What are the three main groups of Aboriginal peoples in Canada?", options:["Inuit, Métis, Cree","First Nations, Métis, Inuit","Ojibwe, Mi'kmaq, Métis","Iroquois, Algonquin, Inuit"], answer:1 },
  { id:177, set:8, category:"Who Are Canadians", question:"What does the word 'Inuit' mean?", options:["Northern people","The people","Hunters of the sea","Arctic dwellers"], answer:1 },
  { id:178, set:8, category:"Who Are Canadians", question:"Who are the Métis?", options:["Indigenous people from the Arctic","People of mixed Indigenous and European ancestry","A First Nations group from BC","Descendants of French settlers only"], answer:1 },
  { id:179, set:8, category:"Who Are Canadians", question:"Who were the founding peoples of Canada?", options:["British and French only","Aboriginal peoples, French, and British","Europeans and Americans","Dutch, French, and British"], answer:1 },
  { id:180, set:8, category:"Who Are Canadians", question:"What is the term 'multicultural' mean in the Canadian context?", options:["Everyone speaks one language","Canada welcomes people of all cultures, backgrounds, and religions","Only European cultures are welcome","Culture is regulated by the government"], answer:1 },
  { id:181, set:8, category:"Who Are Canadians", question:"When was the Multiculturalism Act passed in Canada?", options:["1967","1982","1988","1995"], answer:2 },
  { id:182, set:8, category:"Who Are Canadians", question:"What percentage of Canadians speak English as a first language?", options:["About 40%","About 58%","About 75%","About 90%"], answer:1 },
  { id:183, set:8, category:"Who Are Canadians", question:"What province has the largest French-speaking population?", options:["Ontario","New Brunswick","Manitoba","Quebec"], answer:3 },
  { id:184, set:8, category:"Who Are Canadians", question:"What does 'First Nations' refer to?", options:["The first Europeans in Canada","Hundreds of Indigenous peoples south of the Arctic","Inuit peoples","Métis communities"], answer:1 },
  { id:185, set:8, category:"Who Are Canadians", question:"What is a 'visible minority' in Canada?", options:["A group with fewer rights","Persons who are non-Caucasian in race or non-white in colour","A group with a visible disability","Immigrants from visible regions"], answer:1 },
  { id:186, set:8, category:"Who Are Canadians", question:"What are residential schools in Canadian history?", options:["Schools for immigrants","Schools that forcibly removed Indigenous children from their families","French immersion schools","Schools in rural areas"], answer:1 },
  { id:187, set:8, category:"Who Are Canadians", question:"What is the significance of Remembrance Day for Aboriginal veterans?", options:["Aboriginal peoples did not serve","Many Indigenous Canadians served in the World Wars and deserve recognition","Only applies to WWII veterans","A recently created tradition"], answer:1 },
  { id:188, set:8, category:"Who Are Canadians", question:"What is the Indian Act in Canada?", options:["An act giving special privileges to all immigrants","Federal legislation governing certain aspects of First Nations people and reserves","An act from India","A trade act"], answer:1 },
  { id:189, set:8, category:"Who Are Canadians", question:"What language do most Inuit speak?", options:["Cree","Ojibwe","Inuktitut","Michif"], answer:2 },
  { id:190, set:8, category:"Who Are Canadians", question:"What is the Truth and Reconciliation Commission?", options:["A court for immigration disputes","A commission addressing residential school impacts and seeking healing","A government commission for tax disputes","A commission studying Canadian history"], answer:1 },
  { id:191, set:8, category:"Who Are Canadians", question:"Approximately how many immigrants does Canada admit per year?", options:["50,000","150,000","More than 250,000","500,000"], answer:2 },
  { id:192, set:8, category:"Who Are Canadians", question:"What is the significance of the Canadian Multiculturalism Act?", options:["Limits immigration","Officially recognizes and protects cultural diversity in Canada","Establishes two official languages","Gives Aboriginal peoples special status"], answer:1 },
  { id:193, set:8, category:"Who Are Canadians", question:"What does 'bilingualism' mean in the Canadian context?", options:["All Canadians must speak two languages","The federal government operates in both English and French","Only Quebec uses two languages","English and French are mandatory in all provinces"], answer:1 },
  { id:194, set:8, category:"Who Are Canadians", question:"What is Canada's immigration system designed to do?", options:["Accept only skilled workers","Attract workers, students, family members, and refugees","Limit immigration to 10,000 per year","Accept only English-speaking immigrants"], answer:1 },
  { id:195, set:8, category:"Who Are Canadians", question:"What are 'treaty rights' for Indigenous peoples?", options:["Rights granted by the UN","Rights negotiated between the Crown and First Nations in historical agreements","Rights that no longer exist","Rights only for Métis and Inuit"], answer:1 },
  { id:196, set:8, category:"Who Are Canadians", question:"What is Nunavut?", options:["A First Nations reserve","Canada's newest territory, created in 1999, home mainly to Inuit","An Arctic national park","A northern province"], answer:1 },
  { id:197, set:8, category:"Who Are Canadians", question:"What is the term for a person who has permanent resident status in Canada?", options:["A Canadian citizen","A landed immigrant","A temporary worker","A refugee"], answer:1 },
  { id:198, set:8, category:"Who Are Canadians", question:"What does 'land claims' refer to in the context of Indigenous peoples?", options:["Real estate disputes","Negotiations over Indigenous rights to their traditional lands","Territorial boundary disputes","Provincial land ownership"], answer:1 },
  { id:199, set:8, category:"Who Are Canadians", question:"What was the significance of the 1982 Constitution for Indigenous peoples?", options:["It removed their rights","Section 35 recognized and affirmed Aboriginal and treaty rights","It gave them voting rights for the first time","It created the Indian Act"], answer:1 },
  { id:200, set:8, category:"Who Are Canadians", question:"What does the term 'settler' refer to in Canadian history?", options:["A government official","Europeans who colonized Indigenous lands","Immigrants who arrived after 1900","Rural farmers"], answer:1 },

  // ── SET 9: Canada's Economy ───────────────────────────────
  { id:201, set:9, category:"Canada's Economy", question:"What type of economic system does Canada have?", options:["Centrally planned economy","Mixed free market economy","Pure capitalist economy","Socialist economy"], answer:1 },
  { id:202, set:9, category:"Canada's Economy", question:"Which country is Canada's largest trading partner?", options:["China","United Kingdom","United States","Mexico"], answer:2 },
  { id:203, set:9, category:"Canada's Economy", question:"What natural resource is Alberta most known for?", options:["Gold","Oil and natural gas","Lumber","Potash"], answer:1 },
  { id:204, set:9, category:"Canada's Economy", question:"What does Canada export in large quantities?", options:["Electronics and textiles","Natural resources, agricultural products, and manufactured goods","Automobiles only","Tourism services"], answer:1 },
  { id:205, set:9, category:"Canada's Economy", question:"What is Canada's currency?", options:["US Dollar","Canadian Dollar (CAD)","British Pound","Loonie only"], answer:1 },
  { id:206, set:9, category:"Canada's Economy", question:"What industry is based mainly in Ontario and Quebec?", options:["Oil and gas","Financial services and manufacturing","Fishing","Wheat farming"], answer:1 },
  { id:207, set:9, category:"Canada's Economy", question:"What is the role of the Bank of Canada?", options:["It lends money to citizens","It controls monetary policy and issues Canadian currency","It manages all banks","It sets income tax rates"], answer:1 },
  { id:208, set:9, category:"Canada's Economy", question:"Which sector makes up the largest part of Canada's economy?", options:["Manufacturing","Agriculture","Services sector","Mining"], answer:2 },
  { id:209, set:9, category:"Canada's Economy", question:"What is the GST in Canada?", options:["Government Spending Tax","Goods and Services Tax","General Sales Tax","Government Services Transfer"], answer:1 },
  { id:210, set:9, category:"Canada's Economy", question:"What trade agreement does Canada have with the US and Mexico?", options:["NAFTA (now CUSMA/USMCA)","TPP","CETA","GATT"], answer:0 },
  { id:211, set:9, category:"Canada's Economy", question:"What is British Columbia's economy largely based on?", options:["Oil and gas","Forestry, mining, and technology","Agriculture only","Fishing only"], answer:1 },
  { id:212, set:9, category:"Canada's Economy", question:"Which province is the largest producer of wheat?", options:["Manitoba","Alberta","Saskatchewan","Ontario"], answer:2 },
  { id:213, set:9, category:"Canada's Economy", question:"What are Canada's 'staples'?", options:["Basic grocery items","Natural resources like fish, furs, timber, and minerals","Industrial goods","Agricultural products only"], answer:1 },
  { id:214, set:9, category:"Canada's Economy", question:"What is a 'Crown corporation' in Canada?", options:["A company owned by the royal family","A government-owned business that provides services","A privately held company","A foreign-owned company"], answer:1 },
  { id:215, set:9, category:"Canada's Economy", question:"What is the purpose of EI (Employment Insurance) in Canada?", options:["Health insurance for the unemployed","Temporary financial assistance to those who lose their jobs","Retirement pension","Income support for all Canadians"], answer:1 },
  { id:216, set:9, category:"Canada's Economy", question:"What are the Atlantic provinces' economies largely based on?", options:["Oil and gas","Fishing, forestry, and tourism","Technology and finance","Agriculture only"], answer:1 },
  { id:217, set:9, category:"Canada's Economy", question:"What is the CPP (Canada Pension Plan)?", options:["A private investment plan","A federal retirement and disability program funded by employee/employer contributions","A company benefit plan","A provincial pension"], answer:1 },
  { id:218, set:9, category:"Canada's Economy", question:"What is Canada's healthcare system called?", options:["Obamacare","Medicare — a publicly funded, universal system","Private insurance only","National Health System"], answer:1 },
  { id:219, set:9, category:"Canada's Economy", question:"Which province has the most economic activity (largest GDP)?", options:["British Columbia","Alberta","Quebec","Ontario"], answer:3 },
  { id:220, set:9, category:"Canada's Economy", question:"What is the 'Tar Sands' (Oil Sands) region in Canada?", options:["A region in Saskatchewan","A large oil deposit in northern Alberta","A mining area in BC","A natural gas field in Manitoba"], answer:1 },
  { id:221, set:9, category:"Canada's Economy", question:"What is 'CETA'?", options:["A Canadian tax agreement","Comprehensive Economic and Trade Agreement between Canada and the EU","A trade deal with Asia","Canadian Environmental Trade Act"], answer:1 },
  { id:222, set:9, category:"Canada's Economy", question:"What is Canada's national housing agency?", options:["HUD","CMHC (Canada Mortgage and Housing Corporation)","HSBC","Fannie Mae"], answer:1 },
  { id:223, set:9, category:"Canada's Economy", question:"What is the 'loonie'?", options:["Canadian slang for a dollar bill","Canadian $1 coin featuring the loon","A $2 coin","A provincial currency"], answer:1 },
  { id:224, set:9, category:"Canada's Economy", question:"What sector does the Toronto Stock Exchange primarily represent?", options:["Agriculture","Financial services and resource industries","Technology","Manufacturing"], answer:1 },
  { id:225, set:9, category:"Canada's Economy", question:"Which of the following is a major Canadian automotive manufacturing hub?", options:["Calgary","Windsor and Oshawa in Ontario","Vancouver","Halifax"], answer:1 },

  // ── SET 10: Modern Canada ──────────────────────────────────
  { id:226, set:10, category:"Modern Canada", question:"When did Canada adopt its current maple leaf flag?", options:["1867","1931","1965","1982"], answer:2 },
  { id:227, set:10, category:"Modern Canada", question:"Which Prime Minister patriated the Constitution in 1982?", options:["Lester B. Pearson","Pierre Elliott Trudeau","Brian Mulroney","John Diefenbaker"], answer:1 },
  { id:228, set:10, category:"Modern Canada", question:"What was the FLQ Crisis of 1970?", options:["A Quebec referendum","A terrorist crisis involving kidnappings by the Front de libération du Québec","A labour strike","A constitutional crisis"], answer:1 },
  { id:229, set:10, category:"Modern Canada", question:"What year did Canada send troops to Korea?", options:["1945","1950","1955","1960"], answer:1 },
  { id:230, set:10, category:"Modern Canada", question:"What Canadian leader won the Nobel Peace Prize for the UN peacekeeping concept?", options:["Pierre Trudeau","John Diefenbaker","Lester B. Pearson","Brian Mulroney"], answer:2 },
  { id:231, set:10, category:"Modern Canada", question:"What is NAFTA now called?", options:["CETA","CUSMA/USMCA","TPP","CPTPP"], answer:1 },
  { id:232, set:10, category:"Modern Canada", question:"In which decade did significant immigration from Asia and the Caribbean increase?", options:["1940s","1950s","1960s and 1970s","1990s only"], answer:2 },
  { id:233, set:10, category:"Modern Canada", question:"What was Expo 67?", options:["A technology expo","Canada's centennial world's fair held in Montreal","A trade fair in Toronto","A sports event"], answer:1 },
  { id:234, set:10, category:"Modern Canada", question:"Which province voted in a referendum on sovereignty in 1995?", options:["Ontario","British Columbia","Alberta","Quebec"], answer:3 },
  { id:235, set:10, category:"Modern Canada", question:"What was the result of the 1995 Quebec referendum?", options:["Quebec voted to separate","Quebec voted to remain in Canada by a narrow margin","The vote was tied","The referendum was cancelled"], answer:1 },
  { id:236, set:10, category:"Modern Canada", question:"When did Canada officially become independent from Britain?", options:["1867","1931 (Statute of Westminster)","1949","1982"], answer:1 },
  { id:237, set:10, category:"Modern Canada", question:"What is the 'Clarity Act'?", options:["An act on clear water standards","Federal legislation setting conditions for Quebec separation","A free speech act","A transparency act for government"], answer:1 },
  { id:238, set:10, category:"Modern Canada", question:"What is Canada's role in NATO?", options:["Canada is not in NATO","Canada is a founding member of NATO","Canada joined in 1990","Canada is an observer only"], answer:1 },
  { id:239, set:10, category:"Modern Canada", question:"What was the 'Baby Boom' in Canada?", options:["A spike in immigration in the 1960s","A significant increase in birth rate after World War II (1946-1965)","A health program for mothers","A population count in 1950"], answer:1 },
  { id:240, set:10, category:"Modern Canada", question:"What is Canada's position on nuclear weapons?", options:["Canada possesses nuclear weapons","Canada is a member of NATO but does not possess nuclear weapons","Canada builds nuclear weapons for allies","Canada has a nuclear weapons program"], answer:1 },
  { id:241, set:10, category:"Modern Canada", question:"What was Pierre Elliott Trudeau's 'Just Society'?", options:["A housing program","A vision of a fair and equal Canada for all citizens","A military policy","A Quebec sovereignty policy"], answer:1 },
  { id:242, set:10, category:"Modern Canada", question:"What is the Clarity Act designed to address?", options:["Immigration policy","The conditions under which the federal government would negotiate secession of a province","Environmental regulations","Trade policy"], answer:1 },
  { id:243, set:10, category:"Modern Canada", question:"When did Canada legalize same-sex marriage nationally?", options:["1999","2003","2005","2007"], answer:2 },
  { id:244, set:10, category:"Modern Canada", question:"What role does Canada play in the United Nations?", options:["Canada is not a UN member","Canada is a founding member and active participant","Canada joined in 1965","Canada is an observer only"], answer:1 },
  { id:245, set:10, category:"Modern Canada", question:"What is the significance of the 1988 Calgary Winter Olympics?", options:["Canada's first Winter Olympics","The first Winter Olympics held in Canada","Canada won the most medals","It was held in Toronto"], answer:1 },
  { id:246, set:10, category:"Modern Canada", question:"What is CIDA (now GAC)?", options:["Canadian Immigration Department","Global Affairs Canada, managing foreign policy and aid","A defence agency","A trade body"], answer:1 },
  { id:247, set:10, category:"Modern Canada", question:"What happened to Aboriginal veterans after World War II?", options:["They received full benefits","Many were denied the same benefits as other veterans","They were given extra benefits","They did not serve"], answer:1 },
  { id:248, set:10, category:"Modern Canada", question:"What is the 'National Energy Program' associated with?", options:["Clean energy policy","A controversial 1980 federal policy on oil pricing and revenue","A provincial energy plan","A nuclear power initiative"], answer:1 },
  { id:249, set:10, category:"Modern Canada", question:"What is the significance of Terry Fox?", options:["An Olympic gold medallist","A Canadian who ran the Marathon of Hope to raise money for cancer research","A prime minister","A war hero"], answer:1 },
  { id:250, set:10, category:"Modern Canada", question:"Who is Rick Hansen?", options:["A hockey player","A Canadian who wheeled around the world to raise awareness for spinal cord injury","A prime minister","An explorer"], answer:1 },

  // ── SET 11: Canada's Regions – Atlantic ───────────────────
  { id:251, set:11, category:"Atlantic Provinces", question:"Which of the following is NOT an Atlantic province?", options:["Nova Scotia","New Brunswick","Manitoba","Prince Edward Island"], answer:2 },
  { id:252, set:11, category:"Atlantic Provinces", question:"What is Prince Edward Island famous for?", options:["Oil production","Anne of Green Gables and potatoes","Fishing only","Lumber"], answer:1 },
  { id:253, set:11, category:"Atlantic Provinces", question:"What is Newfoundland and Labrador's main offshore resource?", options:["Gold","Potash","Offshore oil (Hibernia field)","Diamonds"], answer:2 },
  { id:254, set:11, category:"Atlantic Provinces", question:"What is Halifax known for in Canadian history?", options:["The site of Confederation","A major port city and the explosion of 1917","The first Parliament","A fur trade hub"], answer:1 },
  { id:255, set:11, category:"Atlantic Provinces", question:"What is New Brunswick's status regarding official languages?", options:["English only province","The only officially bilingual province in Canada","French only","Neither officially bilingual"], answer:1 },
  { id:256, set:11, category:"Atlantic Provinces", question:"What is the Cabot Trail famous for?", options:["A railway route","A scenic driving route in Cape Breton, Nova Scotia","A hiking trail in PEI","A waterway in New Brunswick"], answer:1 },
  { id:257, set:11, category:"Atlantic Provinces", question:"Who are the Acadians?", options:["Indigenous people of Atlantic Canada","French-speaking descendants of early French settlers in Atlantic Canada","British settlers in Nova Scotia","Métis of the Atlantic region"], answer:1 },
  { id:258, set:11, category:"Atlantic Provinces", question:"What is the Bay of Fundy famous for?", options:["Its deep-sea fishing","Having the world's highest tidal range","A naval battle","Its oil reserves"], answer:1 },
  { id:259, set:11, category:"Atlantic Provinces", question:"Which Atlantic province is the smallest in area?", options:["Nova Scotia","New Brunswick","Newfoundland and Labrador","Prince Edward Island"], answer:3 },
  { id:260, set:11, category:"Atlantic Provinces", question:"What is the capital of Newfoundland and Labrador?", options:["Corner Brook","Happy Valley-Goose Bay","St. John's","Grand Falls"], answer:2 },
  { id:261, set:11, category:"Atlantic Provinces", question:"What is Nova Scotia known as in Gaelic?", options:["New France","New Scotland","New England","New Ireland"], answer:1 },
  { id:262, set:11, category:"Atlantic Provinces", question:"Which fish led to early European exploration of Atlantic Canada?", options:["Salmon","Cod","Lobster","Halibut"], answer:1 },
  { id:263, set:11, category:"Atlantic Provinces", question:"What happened in the Halifax Explosion of 1917?", options:["A volcanic eruption","Two ships collided, causing one of the largest man-made explosions in history","A naval battle","A fire destroyed the city"], answer:1 },
  { id:264, set:11, category:"Atlantic Provinces", question:"What is the Confederation Bridge?", options:["A historic railway bridge","A bridge connecting PEI to New Brunswick","A bridge in Halifax","A bridge over the St. Lawrence"], answer:1 },
  { id:265, set:11, category:"Atlantic Provinces", question:"What is Fredericton the capital of?", options:["Nova Scotia","Newfoundland and Labrador","Prince Edward Island","New Brunswick"], answer:3 },
  { id:266, set:11, category:"Atlantic Provinces", question:"Which Atlantic province joined Confederation last?", options:["Nova Scotia","PEI","New Brunswick","Newfoundland and Labrador"], answer:3 },
  { id:267, set:11, category:"Atlantic Provinces", question:"What is the primary language spoken in most of Nova Scotia?", options:["French","Mi'kmaq","English","Gaelic"], answer:2 },
  { id:268, set:11, category:"Atlantic Provinces", question:"What is L'Anse aux Meadows significant for?", options:["A French fort","A Viking settlement in Newfoundland, the first known European settlement in North America","An Inuit community","A WWII memorial"], answer:1 },
  { id:269, set:11, category:"Atlantic Provinces", question:"What is the Mi'kmaq?", options:["A French settler community","An Indigenous people of Atlantic Canada","A Métis group","A language unique to New Brunswick"], answer:1 },
  { id:270, set:11, category:"Atlantic Provinces", question:"What are New Brunswick's primary industries?", options:["Oil and mining","Forestry, fishing, and agriculture","Technology","Automobile manufacturing"], answer:1 },

  // ── SET 12: Quebec & Ontario ──────────────────────────────
  { id:271, set:12, category:"Quebec & Ontario", question:"What is Quebec often called?", options:["La Belle Province","The Heart of Canada","The Gateway Province","The Golden Province"], answer:0 },
  { id:272, set:12, category:"Quebec & Ontario", question:"What percentage of Canadians live in Quebec and Ontario combined?", options:["About 40%","About 50%","About 62%","About 75%"], answer:2 },
  { id:273, set:12, category:"Quebec & Ontario", question:"What language do most residents of Quebec speak as a first language?", options:["English","French","Both equally","Indigenous languages"], answer:1 },
  { id:274, set:12, category:"Quebec & Ontario", question:"What is the largest city in Canada?", options:["Montreal","Ottawa","Vancouver","Toronto"], answer:3 },
  { id:275, set:12, category:"Quebec & Ontario", question:"What is Niagara Falls?", options:["A river in Quebec","A famous waterfall on the Ontario-US border","A lake in British Columbia","A dam on the Ottawa River"], answer:1 },
  { id:276, set:12, category:"Quebec & Ontario", question:"What is Canada's seat of government?", options:["Toronto","Montreal","Ottawa","Kingston"], answer:2 },
  { id:277, set:12, category:"Quebec & Ontario", question:"What act protects the French language in Quebec?", options:["The Official Languages Act","Bill 101 (Charter of the French Language)","The Quebec Act","The Quiet Revolution Act"], answer:1 },
  { id:278, set:12, category:"Quebec & Ontario", question:"What is the St. Lawrence Seaway?", options:["A river in Ontario","A system of locks connecting the Great Lakes to the Atlantic Ocean","A canal in Quebec","A maritime boundary"], answer:1 },
  { id:279, set:12, category:"Quebec & Ontario", question:"What is Ottawa-Gatineau?", options:["Two separate cities","A bilingual capital region straddling Ontario and Quebec","A city in Ontario only","A city in Quebec only"], answer:1 },
  { id:280, set:12, category:"Quebec & Ontario", question:"Where is the CN Tower located?", options:["Montreal","Ottawa","Quebec City","Toronto"], answer:3 },
  { id:281, set:12, category:"Quebec & Ontario", question:"What is Quebec City famous for being?", options:["Canada's largest city","A walled city and UNESCO World Heritage Site","The capital of Canada","The site of Confederation"], answer:1 },
  { id:282, set:12, category:"Quebec & Ontario", question:"What is Ontario often called given its economic importance?", options:["Canada's breadbasket","The industrial and economic heartland of Canada","The cultural capital","The Pacific gateway"], answer:1 },
  { id:283, set:12, category:"Quebec & Ontario", question:"What treaty established the border between Canada and the US east of the Rockies?", options:["Treaty of Paris (1783)","The Rush-Bagot Agreement","The 49th Parallel Treaty","The Oregon Treaty"], answer:0 },
  { id:284, set:12, category:"Quebec & Ontario", question:"What is the Rideau Canal famous for?", options:["Connecting the Great Lakes to Quebec","A historic canal in Ottawa, a UNESCO site, and world's largest skating rink in winter","The first Canadian canal","A war fortification"], answer:1 },
  { id:285, set:12, category:"Quebec & Ontario", question:"What famous festival does Quebec City host in winter?", options:["Mardi Gras","Carnaval de Quebec","Festival du Voyageur","Just for Laughs"], answer:1 },
  { id:286, set:12, category:"Quebec & Ontario", question:"What is the Ontario Science Centre known for?", options:["A natural history museum","An interactive science and technology museum","A space exploration museum","An Indigenous culture centre"], answer:1 },
  { id:287, set:12, category:"Quebec & Ontario", question:"What is the significance of the National Capital Region?", options:["It is part of Quebec only","It spans Ottawa (Ontario) and Gatineau (Quebec) and is the seat of federal government","It is Canada's largest urban area","It is a separate federal territory"], answer:1 },
  { id:288, set:12, category:"Quebec & Ontario", question:"What are the main industries in Quebec?", options:["Oil and gas","Aerospace, pharmaceuticals, IT, and hydroelectric power","Agriculture only","Forestry only"], answer:1 },
  { id:289, set:12, category:"Quebec & Ontario", question:"When was Toronto (then York) founded?", options:["1793","1867","1812","1850"], answer:0 },
  { id:290, set:12, category:"Quebec & Ontario", question:"What is Hydro-Québec?", options:["A private electricity company","A provincial Crown corporation that generates and distributes electricity in Quebec","A federal agency","A US-based utility"], answer:1 },

  // ── SET 13: Western Canada ────────────────────────────────
  { id:291, set:13, category:"Western Canada", question:"What year did Alberta and Saskatchewan become provinces?", options:["1867","1871","1905","1912"], answer:2 },
  { id:292, set:13, category:"Western Canada", question:"What is British Columbia's most populous city?", options:["Victoria","Kelowna","Surrey","Vancouver"], answer:3 },
  { id:293, set:13, category:"Western Canada", question:"What are the Rocky Mountains significant for?", options:["Rich oil deposits","A natural boundary and major tourist destination in western Canada","A transcontinental railway route","Rich farming land"], answer:1 },
  { id:294, set:13, category:"Western Canada", question:"What is Banff National Park?", options:["A provincial park in BC","Canada's first national park, established in 1885, in Alberta","A national park in Manitoba","A park in Saskatchewan"], answer:1 },
  { id:295, set:13, category:"Western Canada", question:"What is the Canadian Prairies known for producing?", options:["Timber and fish","Wheat, canola, and beef","Oil only","Technology"], answer:1 },
  { id:296, set:13, category:"Western Canada", question:"What was the significance of the North-West Rebellion of 1885?", options:["An Indigenous uprising against railway expansion","Métis and First Nations resistance led by Louis Riel against the federal government","A miners' strike","A provincial secession attempt"], answer:1 },
  { id:297, set:13, category:"Western Canada", question:"What major international event was held in Vancouver in 1986?", options:["The Winter Olympics","Expo 86","The G7 Summit","The Commonwealth Games"], answer:1 },
  { id:298, set:13, category:"Western Canada", question:"What is the largest city in Alberta?", options:["Edmonton (the capital)","Calgary","Red Deer","Lethbridge"], answer:1 },
  { id:299, set:13, category:"Western Canada", question:"What ocean does British Columbia border?", options:["Atlantic Ocean","Arctic Ocean","Pacific Ocean","Indian Ocean"], answer:2 },
  { id:300, set:13, category:"Western Canada", question:"What is the significance of 'head tax' in Canadian history?", options:["A tax on Indigenous peoples","A discriminatory tax imposed on Chinese immigrants from 1885 to 1923","A trade tax","A property tax"], answer:1 },
  { id:301, set:13, category:"Western Canada", question:"What is Whistler, BC known for?", options:["Oil production","A world-renowned ski resort that hosted the 2010 Winter Olympics alpine events","A fishing village","A mining town"], answer:1 },
  { id:302, set:13, category:"Western Canada", question:"What is the significance of the Fraser River?", options:["A major oil pipeline route","Site of the Gold Rush of 1858 and a key waterway in BC","A trade route to Asia","A US-Canada boundary"], answer:1 },
  { id:303, set:13, category:"Western Canada", question:"What are 'métis settlements' in Alberta?", options:["Housing projects","Legislated areas where Métis people have self-government","Provincial parks","Indigenous reserves"], answer:1 },
  { id:304, set:13, category:"Western Canada", question:"What is the Calgary Stampede?", options:["A hockey tournament","An annual rodeo and festival celebrating western Canadian heritage","A political event","A film festival"], answer:1 },
  { id:305, set:13, category:"Western Canada", question:"What were the 2010 Winter Olympics' host city?", options:["Calgary","Edmonton","Vancouver","Kelowna"], answer:2 },
  { id:306, set:13, category:"Western Canada", question:"Which province is known for canola production?", options:["British Columbia","Ontario","Saskatchewan","Alberta"], answer:2 },
  { id:307, set:13, category:"Western Canada", question:"What is the Pacific Rim National Park Reserve known for?", options:["Whale watching and surfing on Vancouver Island","Mountain climbing in Alberta","Oil sands in BC","A military training area"], answer:0 },
  { id:308, set:13, category:"Western Canada", question:"What is the significance of Haida Gwaii (formerly Queen Charlotte Islands)?", options:["An oil field","An archipelago home to the Haida Nation and a UNESCO site","A fishing fleet hub","A military base"], answer:1 },
  { id:309, set:13, category:"Western Canada", question:"When did British Columbia join Confederation?", options:["1867","1870","1871","1905"], answer:2 },
  { id:310, set:13, category:"Western Canada", question:"What is the capital of the Northwest Territories?", options:["Whitehorse","Iqaluit","Yellowknife","Inuvik"], answer:2 },

  // ── SET 14: The North ─────────────────────────────────────
  { id:311, set:14, category:"The North", question:"What year was Nunavut created as a territory?", options:["1982","1993","1999","2005"], answer:2 },
  { id:312, set:14, category:"The North", question:"What does 'Nunavut' mean in Inuktitut?", options:["Our home","Our land","The people's land","Northern territory"], answer:1 },
  { id:313, set:14, category:"The North", question:"Which Indigenous group primarily inhabits Nunavut?", options:["First Nations","Métis","Inuit","Dene"], answer:2 },
  { id:314, set:14, category:"The North", question:"What ocean borders Canada's north?", options:["Pacific","Atlantic","Arctic","Indian"], answer:2 },
  { id:315, set:14, category:"The North", question:"What is the Northwest Passage?", options:["A railway through the north","A sea route through the Arctic connecting the Atlantic and Pacific oceans","A road through the Yukon","A trade route through Russia"], answer:1 },
  { id:316, set:14, category:"The North", question:"What is Yellowknife known for?", options:["Farming","Diamond mining and the capital of the Northwest Territories","Oil production","Tourism only"], answer:1 },
  { id:317, set:14, category:"The North", question:"What is the Klondike Gold Rush of 1896-1899?", options:["A gold rush in Ontario","A gold rush in the Yukon that brought thousands of prospectors to the region","A British Columbia gold rush","A Manitoba gold rush"], answer:1 },
  { id:318, set:14, category:"The North", question:"What are the northern lights also called?", options:["Solar flares","Aurora Borealis","Arctic Lights","Polar Glow"], answer:1 },
  { id:319, set:14, category:"The North", question:"What is the dominant Indigenous group in the Yukon?", options:["Inuit","First Nations (including the Yukon First Nations)","Métis","Dene only"], answer:1 },
  { id:320, set:14, category:"The North", question:"What is 'permafrost'?", options:["A type of arctic weather","Ground that remains frozen throughout the year","A type of ice formation","A northern building material"], answer:1 },
  { id:321, set:14, category:"The North", question:"What is the Alaska Highway significant for?", options:["A pipeline route","A highway built in WWII connecting the US to Alaska through northern BC and Yukon","A trade route","A tourist road built in 2000"], answer:1 },
  { id:322, set:14, category:"The North", question:"What is the main language spoken in Nunavut besides Inuktitut?", options:["French","English","Dene","Michif"], answer:1 },
  { id:323, set:14, category:"The North", question:"How many territories does Canada have?", options:["1","2","3","4"], answer:2 },
  { id:324, set:14, category:"The North", question:"What natural resources are found in the Northwest Territories?", options:["Only fish","Diamonds, gold, and oil and gas","Wheat and canola","Lumber only"], answer:1 },
  { id:325, set:14, category:"The North", question:"What is the 'midnight sun'?", options:["A northern legend","The phenomenon where the sun does not set during summer in the far north","A type of aurora","A midnight festival in Yukon"], answer:1 },
  { id:326, set:14, category:"The North", question:"What is the Dempster Highway significant for?", options:["A railway connection to the north","Canada's only public highway to cross the Arctic Circle","A highway to Nunavut","A logging road"], answer:1 },
  { id:327, set:14, category:"The North", question:"What is 'Inuit Tapiriit Kanatami'?", options:["An Inuit language","The national Inuit organization representing Inuit in Canada","An Inuit art style","A government program"], answer:1 },
  { id:328, set:14, category:"The North", question:"Which Canadian territories border the Arctic Ocean?", options:["Only Nunavut","Nunavut and the Northwest Territories","All three territories","Only the Yukon"], answer:1 },
  { id:329, set:14, category:"The North", question:"What is 'dog mushing'?", options:["A type of Arctic cooking","A sport and traditional mode of transportation using sled dogs","A type of Inuit dance","A mining technique"], answer:1 },
  { id:330, set:14, category:"The North", question:"What is the significance of the Beaufort Sea?", options:["A freshwater lake","An Arctic sea rich in oil and gas resources off Canada's northwestern coast","A shipping lane","A fishing ground only"], answer:1 },

  // ── SET 15: Canadian Culture & Society ───────────────────
  { id:331, set:15, category:"Culture & Society", question:"What is Canada's most popular spectator sport?", options:["Soccer","Baseball","Ice Hockey","Basketball"], answer:2 },
  { id:332, set:15, category:"Culture & Society", question:"Who invented basketball?", options:["An American, James Naismith","A Canadian, James Naismith","A British soldier","A French inventor"], answer:1 },
  { id:333, set:15, category:"Culture & Society", question:"What is the 'Group of Seven'?", options:["A political alliance","A group of Canadian landscape painters formed in 1920","A music band","A sports team"], answer:1 },
  { id:334, set:15, category:"Culture & Society", question:"What is Canada's role in international peacekeeping?", options:["Canada does not participate","Canada is one of the world's leading peacekeeping nations","Canada only participates in NATO missions","Canada leads the UN peacekeeping force"], answer:1 },
  { id:335, set:15, category:"Culture & Society", question:"What is the CBC?", options:["Canadian Border Control","Canadian Broadcasting Corporation — Canada's national public broadcaster","A banking regulator","A cultural association"], answer:1 },
  { id:336, set:15, category:"Culture & Society", question:"What is CRTC?", options:["Canadian Radio-television and Telecommunications Commission","Canadian Regulated Trade Council","A cultural ministry","A broadcasting company"], answer:0 },
  { id:337, set:15, category:"Culture & Society", question:"What is 'poutine'?", options:["A Quebec political party","A Canadian dish of fries, cheese curds, and gravy originated in Quebec","A type of hunting technique","A French pastry"], answer:1 },
  { id:338, set:15, category:"Culture & Society", question:"What is the Toronto International Film Festival (TIFF) known for?", options:["A small local festival","One of the most prestigious film festivals in the world","A government-run film showcase","A festival only for Canadian films"], answer:1 },
  { id:339, set:15, category:"Culture & Society", question:"Who is Emily Carr?", options:["A prime minister","A famous Canadian artist known for paintings of Indigenous cultures and forests","A poet","A political leader"], answer:1 },
  { id:340, set:15, category:"Culture & Society", question:"What is Canada's national library called?", options:["National Library of Canada","Library and Archives Canada","The Canadian Library","The Parliament Library"], answer:1 },
  { id:341, set:15, category:"Culture & Society", question:"What does 'cultural mosaic' mean in Canada?", options:["All cultures merge into one","Canada encourages people to maintain their cultural heritage while being Canadian","A type of artwork","A government policy on arts"], answer:1 },
  { id:342, set:15, category:"Culture & Society", question:"What is Canada's public health care system based on?", options:["Private insurance","A universal, publicly funded system","Employer-provided insurance","US-style coverage"], answer:1 },
  { id:343, set:15, category:"Culture & Society", question:"What is the Just Society associated with?", options:["A charity organization","Pierre Trudeau's vision of equality for all Canadians","A Supreme Court decision","A charter right"], answer:1 },
  { id:344, set:15, category:"Culture & Society", question:"What is the significance of Céline Dion and Justin Bieber to Canada?", options:["They are politicians","They are world-famous Canadian musicians","They are athletes","They are scientists"], answer:1 },
  { id:345, set:15, category:"Culture & Society", question:"What is the Governor General's Award?", options:["A military decoration","A prestigious Canadian award given in arts, literature, and other fields","A sports award","A citizenship honour"], answer:1 },
  { id:346, set:15, category:"Culture & Society", question:"What language is widely used in arts and culture in Quebec?", options:["English","French","Both equally","Bilingual only in government"], answer:1 },
  { id:347, set:15, category:"Culture & Society", question:"What is a 'Toonie'?", options:["Canadian slang for two dollars","The Canadian $2 coin","A $2 bill","Provincial slang"], answer:1 },
  { id:348, set:15, category:"Culture & Society", question:"What is the significance of the National Film Board of Canada (NFB)?", options:["It funds Hollywood films","A federal film agency that produces and distributes Canadian films and documentaries","It regulates broadcasting","It manages CBC"], answer:1 },
  { id:349, set:15, category:"Culture & Society", question:"What is the Commonwealth of Nations?", options:["A trade bloc led by the UK","An international organization of countries mostly formerly part of the British Empire","A military alliance","A group of French-speaking nations"], answer:1 },
  { id:350, set:15, category:"Culture & Society", question:"What is La Francophonie?", options:["A Quebec political movement","An international organization of French-speaking countries and regions","A French-Canadian cultural club","The Quebec government"], answer:1 },

  // ── SET 16: Aboriginal Peoples ───────────────────────────
  { id:351, set:16, category:"Aboriginal Peoples", question:"What are the three groups of Aboriginal peoples recognized in Canada's Constitution?", options:["Cree, Mohawk, Iroquois","First Nations, Métis, Inuit","Algonquin, Dene, Blackfoot","Pacific, Plains, Eastern peoples"], answer:1 },
  { id:352, set:16, category:"Aboriginal Peoples", question:"What is a 'potlatch'?", options:["A type of food","A traditional ceremony of First Nations peoples of the Pacific Northwest involving gift-giving","A type of housing","A hunting technique"], answer:1 },
  { id:353, set:16, category:"Aboriginal Peoples", question:"What is a totem pole?", options:["A tool","Carved wooden poles depicting figures meaningful to Pacific Northwest First Nations","A type of shelter","A navigation instrument"], answer:1 },
  { id:354, set:16, category:"Aboriginal Peoples", question:"What is UNDRIP?", options:["A water rights treaty","UN Declaration on the Rights of Indigenous Peoples","A Canadian immigration program","An Arctic agreement"], answer:1 },
  { id:355, set:16, category:"Aboriginal Peoples", question:"What is the significance of June 21 in Canada?", options:["Canada Day alternate","National Indigenous Peoples Day","Métis Day","Treaty Day"], answer:1 },
  { id:356, set:16, category:"Aboriginal Peoples", question:"What is a 'band council' in First Nations governance?", options:["A musical group","The elected governing body of a First Nations band","A federal government agency","A provincial appointment"], answer:1 },
  { id:357, set:16, category:"Aboriginal Peoples", question:"What is the significance of wampum belts?", options:["Currency","Diplomatic records and agreements among Haudenosaunee (Iroquois) peoples","A type of clothing","A spiritual object only"], answer:1 },
  { id:358, set:16, category:"Aboriginal Peoples", question:"What is residential school syndrome?", options:["A fictional concept","The long-term trauma experienced by residential school survivors and their descendants","A government study","A school type"], answer:1 },
  { id:359, set:16, category:"Aboriginal Peoples", question:"What is the 'numbered treaties' in Canada?", options:["A series of tax agreements","A series of treaties between the Crown and First Nations, numbered 1-11","A land survey system","A series of peace agreements with the US"], answer:1 },
  { id:360, set:16, category:"Aboriginal Peoples", question:"What is MMIW in Canada?", options:["A mining initiative","Missing and Murdered Indigenous Women and Girls — a major social issue in Canada","A museum program","An Indigenous media network"], answer:1 },
  { id:361, set:16, category:"Aboriginal Peoples", question:"What language family do the Cree belong to?", options:["Iroquoian","Algonquian","Dene-Atha","Inuit-Yupik"], answer:1 },
  { id:362, set:16, category:"Aboriginal Peoples", question:"What is the National Day for Truth and Reconciliation?", options:["June 21","September 30 (Orange Shirt Day)","November 11","July 1"], answer:1 },
  { id:363, set:16, category:"Aboriginal Peoples", question:"What is a 'reserve' in Canadian Aboriginal context?", options:["A national park","Land set aside under treaty for a First Nations band","An Inuit community","A Métis settlement"], answer:1 },
  { id:364, set:16, category:"Aboriginal Peoples", question:"Who is Elijah Harper?", options:["A hockey player","A Manitoba MLA and Cree leader who played a key role in blocking the Meech Lake Accord","A federal politician","An author"], answer:1 },
  { id:365, set:16, category:"Aboriginal Peoples", question:"What is the Haudenosaunee (Iroquois) Confederacy?", options:["A French-Indigenous alliance","A confederacy of six original nations: Mohawk, Oneida, Onondaga, Cayuga, Seneca, Tuscarora","An Eastern Canadian trading network","A British-Indigenous treaty"], answer:1 },
  { id:366, set:16, category:"Aboriginal Peoples", question:"What is 'self-government' for Indigenous peoples in Canada?", options:["Complete independence from Canada","The right of Indigenous peoples to govern their own affairs and communities","Only applies to Nunavut","A provincial policy"], answer:1 },
  { id:367, set:16, category:"Aboriginal Peoples", question:"What is FNMI education in Canada?", options:["Federal Native Management Initiative","First Nations, Métis, and Inuit education — education responsive to Indigenous cultural perspectives","A type of school funding","A provincial ministry"], answer:1 },
  { id:368, set:16, category:"Aboriginal Peoples", question:"What is the Assembly of First Nations?", options:["A government department","A national advocacy organization representing First Nations in Canada","A provincial body","A United Nations group"], answer:1 },
  { id:369, set:16, category:"Aboriginal Peoples", question:"What was the 'Indian residential school system' in Canada?", options:["A voluntary school system","Federally funded schools that forcibly removed Indigenous children to assimilate them into Euro-Canadian culture","A bilingual education program","A system to teach Indigenous languages"], answer:1 },
  { id:370, set:16, category:"Aboriginal Peoples", question:"What does 'Turtle Island' refer to?", options:["An island in BC","An Indigenous name for North America","A national park","A Métis homeland"], answer:1 },

  // ── SET 17: Government – Provincial ──────────────────────
  { id:371, set:17, category:"Provincial Government", question:"Who represents the King at the provincial level?", options:["The Premier","The Lieutenant Governor","The Mayor","The Provincial Judge"], answer:1 },
  { id:372, set:17, category:"Provincial Government", question:"What is a provincial legislature called?", options:["Parliament","Legislative Assembly (or National Assembly in Quebec)","Senate","House of Lords"], answer:1 },
  { id:373, set:17, category:"Provincial Government", question:"What is the head of a provincial government called?", options:["Prime Minister","Governor","Premier","President"], answer:2 },
  { id:374, set:17, category:"Provincial Government", question:"Which areas are under provincial jurisdiction in Canada?", options:["Defence and foreign affairs","Education, health, and natural resources","Banking and currency","Criminal law"], answer:1 },
  { id:375, set:17, category:"Provincial Government", question:"What is a 'municipal government' responsible for?", options:["National defence","Local services like roads, water, parks, and fire protection","Provincial education","Federal income tax"], answer:1 },
  { id:376, set:17, category:"Provincial Government", question:"What is a 'city council'?", options:["A provincial body","The governing body of a municipality","A federal advisory group","A judicial panel"], answer:1 },
  { id:377, set:17, category:"Provincial Government", question:"What is 'equalization payments' in Canada?", options:["Equal pay legislation","Federal payments to provinces to reduce fiscal disparities","Equal voting rights payments","Tax refunds"], answer:1 },
  { id:378, set:17, category:"Provincial Government", question:"Who has the power over education in Canada?", options:["The federal government","Provincial governments","The municipalities","The Supreme Court"], answer:1 },
  { id:379, set:17, category:"Provincial Government", question:"What is the role of a 'Member of Provincial Parliament' (MPP)?", options:["Sits in the federal Senate","Represents constituents in the provincial legislature","Manages municipal services","Appoints provincial judges"], answer:1 },
  { id:380, set:17, category:"Provincial Government", question:"What is a provincial budget?", options:["The federal spending plan","A province's annual financial plan for revenues and expenditures","A municipal funding request","A corporate financial plan"], answer:1 },
  { id:381, set:17, category:"Provincial Government", question:"What is the role of a 'mayor'?", options:["Head of a provincial government","Head of a municipal government","A federal official","A lieutenant governor's assistant"], answer:1 },
  { id:382, set:17, category:"Provincial Government", question:"What services are municipalities responsible for?", options:["Prisons and courts","Local roads, sewage, waste collection, and bylaws","Schools and hospitals","Immigration services"], answer:1 },
  { id:383, set:17, category:"Provincial Government", question:"Which level of government is responsible for immigration?", options:["Municipal only","Shared between federal and provincial governments","Federal only","Provincial only"], answer:2 },
  { id:384, set:17, category:"Provincial Government", question:"What is the role of a 'school board'?", options:["A federal education committee","A locally elected body that oversees public schools","A provincial ministry","A university administration"], answer:1 },
  { id:385, set:17, category:"Provincial Government", question:"What is a 'provincial tax' in Canada?", options:["A federal tax collected by provinces","A tax levied by a provincial government, like provincial income tax or HST","A local property tax","A municipal fee"], answer:1 },
  { id:386, set:17, category:"Provincial Government", question:"What is the HST?", options:["High Sales Tax","Harmonized Sales Tax — a combined federal and provincial sales tax","Hospital Services Tax","Heritage and Society Tax"], answer:1 },
  { id:387, set:17, category:"Provincial Government", question:"How are provincial premiers chosen?", options:["Appointed by the PM","Elected by party members who form government","Appointed by the Lieutenant Governor","Elected province-wide by citizens"], answer:1 },
  { id:388, set:17, category:"Provincial Government", question:"What is the 'notwithstanding clause'?", options:["A court exemption","A constitutional clause allowing provinces to override certain Charter rights temporarily","A PM's veto power","An environmental exemption"], answer:1 },
  { id:389, set:17, category:"Provincial Government", question:"What does 'provincial jurisdiction' mean?", options:["Federal government control","Areas of law and policy that are under the authority of provinces","Municipal authority","International jurisdiction"], answer:1 },
  { id:390, set:17, category:"Provincial Government", question:"What is a 'by-law'?", options:["A federal law","A law enacted by a municipal government","A provincial regulation","A constitutional amendment"], answer:1 },

  // ── SET 18: Military & Peacekeeping ──────────────────────
  { id:391, set:18, category:"Military & Peacekeeping", question:"What are the branches of the Canadian Armed Forces?", options:["Army, Navy, Air Force, Space Command","Royal Canadian Navy, Canadian Army, Royal Canadian Air Force","Army and Navy only","Regular and Reserve forces only"], answer:1 },
  { id:392, set:18, category:"Military & Peacekeeping", question:"What is November 11 and why is it significant?", options:["Canada Day alternate","Remembrance Day — marks the end of World War I (11th hour, 11th day, 11th month 1918)","A military holiday","The founding of the Canadian military"], answer:1 },
  { id:393, set:18, category:"Military & Peacekeeping", question:"What is NORAD?", options:["A Canadian military base","A joint Canada-US aerospace and air defence command","A NATO headquarters","A UN peacekeeping mission"], answer:1 },
  { id:394, set:18, category:"Military & Peacekeeping", question:"Where did Canadian forces land on D-Day?", options:["Omaha Beach","Sword Beach","Juno Beach","Gold Beach"], answer:2 },
  { id:395, set:18, category:"Military & Peacekeeping", question:"What is the role of the Canadian Army Reserve?", options:["A full-time military force","Part-time military personnel who support regular forces","A police reserve","A disaster relief unit only"], answer:1 },
  { id:396, set:18, category:"Military & Peacekeeping", question:"Which Canadian won the Nobel Peace Prize for the concept of UN peacekeeping?", options:["Pierre Trudeau","Lester B. Pearson","John Diefenbaker","Louis St. Laurent"], answer:1 },
  { id:397, set:18, category:"Military & Peacekeeping", question:"What is the Canadian War Museum located in?", options:["Toronto","Halifax","Ottawa","Quebec City"], answer:2 },
  { id:398, set:18, category:"Military & Peacekeeping", question:"How many Canadians served in World War I?", options:["100,000","300,000","Over 600,000","1 million"], answer:2 },
  { id:399, set:18, category:"Military & Peacekeeping", question:"What is the Victoria Cross?", options:["A military base","The highest military decoration in the Commonwealth, awarded for exceptional bravery","A naval vessel","A military medal for service"], answer:1 },
  { id:400, set:18, category:"Military & Peacekeeping", question:"What was Canada's military contribution in the Korean War?", options:["Minimal — only 100 soldiers","About 26,000 Canadians served","Canada did not participate","Only naval ships were sent"], answer:1 },
  { id:401, set:18, category:"Military & Peacekeeping", question:"What is the Merchant Navy in Canadian history?", options:["A private shipping company","Civilian mariners who transported troops and supplies in WWII","A military naval unit","A fishing fleet"], answer:1 },
  { id:402, set:18, category:"Military & Peacekeeping", question:"What is Camp Valcartier?", options:["A WWII memorial","A major Canadian Forces base in Quebec","A military museum","A naval base"], answer:1 },
  { id:403, set:18, category:"Military & Peacekeeping", question:"What is NATO?", options:["A trade organization","The North Atlantic Treaty Organization — a military alliance","A UN committee","A European security force"], answer:1 },
  { id:404, set:18, category:"Military & Peacekeeping", question:"What was the significance of Vimy Ridge for Canada?", options:["A defeat that united Canada","A victory where all four Canadian divisions fought together for the first time, seen as a national coming of age","The first major battle of WWI","A naval victory"], answer:1 },
  { id:405, set:18, category:"Military & Peacekeeping", question:"What is Canada's current defence alliance obligation?", options:["Only UN missions","Member of NATO with collective defence obligations","US defence treaty only","NORAD only"], answer:1 },
  { id:406, set:18, category:"Military & Peacekeeping", question:"What is the role of Lester B. Pearson in peacekeeping?", options:["He commanded troops in Korea","He proposed the first UN peacekeeping force and won the Nobel Peace Prize","He created NORAD","He led Canada in WWI"], answer:1 },
  { id:407, set:18, category:"Military & Peacekeeping", question:"What is Canada's Disaster Assistance Response Team (DART)?", options:["A police unit","A military unit providing disaster relief internationally","A civilian aid organization","A federal emergency fund"], answer:1 },
  { id:408, set:18, category:"Military & Peacekeeping", question:"When did Canada declare war in World War II?", options:["September 1, 1939","September 10, 1939","December 7, 1941","January 1, 1940"], answer:1 },
  { id:409, set:18, category:"Military & Peacekeeping", question:"What is the Tomb of the Unknown Soldier?", options:["A war museum exhibit","A memorial in Ottawa honouring unidentified Canadians who died in war","A cemetery in France","A monument in Halifax"], answer:1 },
  { id:410, set:18, category:"Military & Peacekeeping", question:"What is the significance of Dieppe (1942)?", options:["A Canadian victory","A costly Allied raid on Nazi-occupied France where many Canadians died","The first Canadian battle in WWII","A naval battle"], answer:1 },

  // ── SET 19: Applying for Citizenship ──────────────────────
  { id:411, set:19, category:"Applying for Citizenship", question:"How many years of physical presence are required before applying for citizenship?", options:["2 out of last 5 years","3 out of last 5 years","4 out of last 5 years","5 consecutive years"], answer:1 },
  { id:412, set:19, category:"Applying for Citizenship", question:"What age group must take the citizenship test?", options:["14 to 64","16 to 54","18 to 54","20 to 60"], answer:2 },
  { id:413, set:19, category:"Applying for Citizenship", question:"What is the passing score on the citizenship test?", options:["60%","70%","75% (15 of 20)","80%"], answer:2 },
  { id:414, set:19, category:"Applying for Citizenship", question:"What is the Oath of Citizenship?", options:["A test question","A solemn promise made when becoming a Canadian citizen","A permanent resident oath","A declaration of intent to apply"], answer:1 },
  { id:415, set:19, category:"Applying for Citizenship", question:"How many questions are on the Canadian citizenship test?", options:["10","15","20","25"], answer:2 },
  { id:416, set:19, category:"Applying for Citizenship", question:"What study guide is used to prepare for the citizenship test?", options:["Canada: A History","Discover Canada: The Rights and Responsibilities of Citizenship","Welcome to Canada","Canadian Citizenship Handbook"], answer:1 },
  { id:417, set:19, category:"Applying for Citizenship", question:"How much time is allowed for the citizenship test?", options:["20 minutes","30 minutes","45 minutes","60 minutes"], answer:1 },
  { id:418, set:19, category:"Applying for Citizenship", question:"What happens if you fail the citizenship test twice?", options:["Your application is denied","You are interviewed by a citizenship judge","You must wait 5 years to reapply","You are deported"], answer:1 },
  { id:419, set:19, category:"Applying for Citizenship", question:"What does the Oath of Citizenship pledge?", options:["To pay all taxes","To be faithful and bear true allegiance to His Majesty the King and uphold Canada's laws","To serve in the military","To learn both official languages"], answer:1 },
  { id:420, set:19, category:"Applying for Citizenship", question:"What document must you have before applying for citizenship?", options:["A Canadian passport","Permanent Resident (PR) status","A work permit","A study permit"], answer:1 },
  { id:421, set:19, category:"Applying for Citizenship", question:"What is a 'citizenship ceremony'?", options:["A test review session","The official event where you take the Oath of Citizenship and receive your certificate","A community welcome party","An immigration interview"], answer:1 },
  { id:422, set:19, category:"Applying for Citizenship", question:"Which of the following can disqualify a citizenship application?", options:["Working in Canada","A criminal record or charges","Being employed abroad","Having children"], answer:1 },
  { id:423, set:19, category:"Applying for Citizenship", question:"What is the 'physical presence' requirement for citizenship?", options:["Living in Canada full-time","Having spent at least 1,095 days (3 out of 5 years) in Canada","Working in Canada for 3 years","Having a Canadian address"], answer:1 },
  { id:424, set:19, category:"Applying for Citizenship", question:"What languages are acceptable for the citizenship test?", options:["English only","French only","English or French","Any official language plus one other"], answer:2 },
  { id:425, set:19, category:"Applying for Citizenship", question:"What is 'deemed a permanent resident' for children applying with parents?", options:["Children automatically get citizenship","Children under 18 can be included in a parent's citizenship application","All children under 16 get citizenship","Children must apply separately"], answer:1 },
  { id:426, set:19, category:"Applying for Citizenship", question:"What are the language requirements for citizenship?", options:["Only written language skills","Adequate ability to communicate in English or French (CLB 4)","Fluency in both official languages","No language requirement"], answer:1 },
  { id:427, set:19, category:"Applying for Citizenship", question:"What must you file to show proof of physical presence?", options:["A travel diary","Tax returns and other documents showing time in Canada","Employment records only","School records"], answer:1 },
  { id:428, set:19, category:"Applying for Citizenship", question:"What is the 'intention to reside' requirement?", options:["A plan to buy a home","Stating your intent to reside in Canada as part of the application","Signing a 5-year lease","Registering a business"], answer:1 },
  { id:429, set:19, category:"Applying for Citizenship", question:"Can you hold dual citizenship in Canada?", options:["No, you must renounce all other citizenship","Yes, Canada generally allows dual citizenship","Only if approved by Cabinet","Only for certain countries"], answer:1 },
  { id:430, set:19, category:"Applying for Citizenship", question:"What is the citizenship certificate?", options:["A passport","The official document proving Canadian citizenship","A permanent resident card","A birth certificate"], answer:1 },

  // ── SET 20: General Knowledge & Mixed ────────────────────
  { id:431, set:20, category:"General Knowledge", question:"What is the Meech Lake Accord?", options:["An environmental agreement","A failed constitutional agreement in the late 1980s to recognize Quebec as a distinct society","A peace treaty","A trade deal with the US"], answer:1 },
  { id:432, set:20, category:"General Knowledge", question:"What is Canada's official motto?", options:["True North, Strong and Free","A Mari Usque ad Mare (From Sea to Sea)","Peace, Order, and Good Government","Unity in Diversity"], answer:1 },
  { id:433, set:20, category:"General Knowledge", question:"What is the Canadian Human Rights Commission?", options:["A court","A federal body that promotes equality and prevents discrimination","A police organization","A union organization"], answer:1 },
  { id:434, set:20, category:"General Knowledge", question:"What is Canada's international dialling code?", options:["+1","+44","+61","+49"], answer:0 },
  { id:435, set:20, category:"General Knowledge", question:"What is the name of the Canadian national police force?", options:["Canadian Police Service","Royal Canadian Mounted Police (RCMP)","National Police of Canada","Federal Police"], answer:1 },
  { id:436, set:20, category:"General Knowledge", question:"What is the population of Canada (approximate)?", options:["20 million","30 million","38-40 million","50 million"], answer:2 },
  { id:437, set:20, category:"General Knowledge", question:"What is the largest city in western Canada?", options:["Edmonton","Calgary","Vancouver","Victoria"], answer:2 },
  { id:438, set:20, category:"General Knowledge", question:"What does 'G7' stand for and is Canada a member?", options:["Group of 7 largest economies; yes, Canada is a founding member","Group of 7 nations; Canada is not a member","Global 7 alliance; Canada joined in 1990","Group of 7 NATO countries; yes"], answer:0 },
  { id:439, set:20, category:"General Knowledge", question:"What is the metric system used in Canada?", options:["Canada uses only imperial","Canada officially uses the metric system","Canada uses both equally","Provinces choose their own system"], answer:1 },
  { id:440, set:20, category:"General Knowledge", question:"What is Canada's area in terms of world ranking?", options:["1st largest","2nd largest country in the world by total area","3rd largest","4th largest"], answer:1 },
  { id:441, set:20, category:"General Knowledge", question:"What is the 'Fathers of Confederation'?", options:["Canada's first military leaders","Politicians who created Canada through the Confederation process in 1867","A political party","The first Cabinet ministers"], answer:1 },
  { id:442, set:20, category:"General Knowledge", question:"What is 'Francophone' Canada?", options:["Only Quebec","French-speaking communities across Canada, not just Quebec","A government program","A cultural festival"], answer:1 },
  { id:443, set:20, category:"General Knowledge", question:"What is the 'War of 1812'?", options:["A war between Canada and the US that ended in a draw","A war between the US and Britain (including what is now Canada) — Canada repelled US invasion","A European war","A war between France and Britain in Canada"], answer:1 },
  { id:444, set:20, category:"General Knowledge", question:"What is the significance of the Dominion of Canada?", options:["A province","The name of Canada after Confederation in 1867","A military unit","A trade organization"], answer:1 },
  { id:445, set:20, category:"General Knowledge", question:"What is the Canadian Senate's role in legislation?", options:["The Senate initiates all legislation","The Senate reviews, amends, and must approve bills passed by the House of Commons","The Senate can override the House indefinitely","The Senate has no role in legislation"], answer:1 },
  { id:446, set:20, category:"General Knowledge", question:"What year was Confederation?", options:["1776","1837","1867","1885"], answer:2 },
  { id:447, set:20, category:"General Knowledge", question:"What is 'prorogation' of Parliament?", options:["The dissolution of Parliament for an election","The suspension of Parliament at the end of a session without dissolving it","A Senate procedure","A constitutional amendment"], answer:1 },
  { id:448, set:20, category:"General Knowledge", question:"How many original provinces joined Confederation in 1867?", options:["2","4","6","7"], answer:1 },
  { id:449, set:20, category:"General Knowledge", question:"What were the four original provinces of Confederation?", options:["Ontario, Quebec, Nova Scotia, New Brunswick","Ontario, Quebec, BC, PEI","Ontario, Quebec, Manitoba, Nova Scotia","Nova Scotia, New Brunswick, PEI, Newfoundland"], answer:0 },
  { id:450, set:20, category:"General Knowledge", question:"What is the significance of 'Peace, Order, and Good Government'?", options:["Canada's national motto","The constitutional basis for federal legislative power in Canada","A policing guideline","A Quebec law"], answer:1 },

  // ── BONUS Questions 451–500 ──────────────────────────────
  { id:451, set:1, category:"Rights & Responsibilities", question:"What is 'freedom of association' in Canada?", options:["The right to form unions and groups","The right to choose your friends","The right to join government","The right to own property"], answer:0 },
  { id:452, set:2, category:"Canadian History", question:"What was the 'Persons Case' of 1929?", options:["A criminal case","A Supreme Court ruling that women are 'persons' under the law and eligible for Senate appointment","A labour case","A trade case"], answer:1 },
  { id:453, set:3, category:"Canadian Government", question:"What is the 'Speaker of the House'?", options:["The PM's spokesperson","The presiding officer of the House of Commons who maintains order","A Senate official","A provincial official"], answer:1 },
  { id:454, set:4, category:"Federal Elections", question:"What are political 'platforms'?", options:["Physical stages at rallies","A party's policy proposals and commitments to voters","Government announcements","Budget documents"], answer:1 },
  { id:455, set:5, category:"Justice System", question:"What is 'extradition'?", options:["Deportation of immigrants","The legal process of surrendering a fugitive from one country to another","A type of appeal","A court summons"], answer:1 },
  { id:456, set:6, category:"Canadian Symbols", question:"What does the term 'Dominion' in Canada's name historically mean?", options:["Territory under a king","Self-governing nation within the British Empire","A type of federation","A military term"], answer:1 },
  { id:457, set:7, category:"Canadian Geography", question:"What is the Shield (Canadian Shield)?", options:["A military insignia","A vast rocky area covering much of northern Canada, rich in minerals","A provincial park system","A mountain range"], answer:1 },
  { id:458, set:8, category:"Who Are Canadians", question:"What is a 'refugee' in the Canadian context?", options:["A visitor from another country","A person fleeing persecution who seeks protection in Canada","A temporary worker","An undocumented immigrant"], answer:1 },
  { id:459, set:9, category:"Canada's Economy", question:"What is the Toronto-Dominion (TD) Bank known as globally?", options:["A small regional bank","One of Canada's largest banks, with major international operations","A government bank","A credit union"], answer:1 },
  { id:460, set:10, category:"Modern Canada", question:"Who was the first female Governor General of Canada?", options:["Adrienne Clarkson","Jeanne Sauvé","Kim Campbell","Mary Simon"], answer:1 },
  { id:461, set:11, category:"Atlantic Provinces", question:"What is the Bluenose?", options:["A fighter jet","A famous Nova Scotia fishing and racing schooner depicted on the Canadian dime","A type of seal","A provincial flower"], answer:1 },
  { id:462, set:12, category:"Quebec & Ontario", question:"What is the Château Frontenac?", options:["A Quebec government building","A famous castle-like hotel in Old Quebec City","A military fortress","A museum"], answer:1 },
  { id:463, set:13, category:"Western Canada", question:"What is the significance of Whistler Mountain and Blackcomb?", options:["A mining site","Ski resorts that hosted the 2010 Winter Olympics alpine events","A national park","A First Nations territory"], answer:1 },
  { id:464, set:14, category:"The North", question:"What is 'country food' in Indigenous northern communities?", options:["Imported food","Traditional food from hunting, fishing, and gathering","Government-supplied food","Restaurant food"], answer:1 },
  { id:465, set:15, category:"Culture & Society", question:"What is 'Anne of Green Gables' and its significance to Canada?", options:["A Quebec novel","A famous novel by L.M. Montgomery set in PEI, a beloved part of Canadian culture","A government publication","A children's educational series"], answer:1 },
  { id:466, set:16, category:"Aboriginal Peoples", question:"What is Inuit art known for?", options:["Oil paintings","Stone carvings, prints, and sculptures often depicting Arctic life and wildlife","Pottery only","Wood carvings only"], answer:1 },
  { id:467, set:17, category:"Provincial Government", question:"What is 'transfer payment' in Canadian federalism?", options:["A wire transfer","Money transferred from the federal government to provinces for social programs","A corporate tax refund","A provincial loan"], answer:1 },
  { id:468, set:18, category:"Military & Peacekeeping", question:"What is the Legion (Royal Canadian Legion)?", options:["A government department","An organization supporting Canadian veterans and their families","A military unit","A political party"], answer:1 },
  { id:469, set:19, category:"Applying for Citizenship", question:"What is a 'citizenship judge'?", options:["A Supreme Court judge","A judge who conducts citizenship hearings if test is failed twice","A provincial court judge","An immigration officer"], answer:1 },
  { id:470, set:20, category:"General Knowledge", question:"What is the significance of the number 150 in Canada's recent history?", options:["150 MPs in Parliament","Canada's 150th anniversary of Confederation celebrated in 2017","150 million Canadians","150 years of the RCMP"], answer:1 },
  { id:471, set:1, category:"Rights & Responsibilities", question:"What is 'legal pluralism' in Canada?", options:["Multiple legal systems for different people","Recognition that Canada has different legal traditions including civil law in Quebec","A type of dual citizenship","Multiple courts for different crimes"], answer:1 },
  { id:472, set:2, category:"Canadian History", question:"What was the Chinese Exclusion Act (1923)?", options:["An act banning Chinese goods","An act that virtually stopped Chinese immigration to Canada, repealed in 1947","An act taxing Chinese immigrants","An act promoting Chinese culture"], answer:1 },
  { id:473, set:3, category:"Canadian Government", question:"What does 'hansard' refer to?", options:["A government building","The official verbatim record of parliamentary debates","A type of bill","A Senate committee"], answer:1 },
  { id:474, set:4, category:"Federal Elections", question:"What is a 'campaign'?", options:["A military operation","A period when candidates and parties seek public support before an election","A government announcement","A period of no legislation"], answer:1 },
  { id:475, set:5, category:"Justice System", question:"What is a 'class action lawsuit'?", options:["A lawsuit by a school","A lawsuit where a large group sues together over the same issue","A government lawsuit","A criminal prosecution"], answer:1 },
  { id:476, set:6, category:"Canadian Symbols", question:"What is the Centennial Flame in Ottawa?", options:["A memorial to war dead","A flame lit in 1967 for Canada's 100th anniversary, burning continuously near Parliament","A lighthouse","A religious monument"], answer:1 },
  { id:477, set:7, category:"Canadian Geography", question:"What is the Strait of Juan de Fuca?", options:["A river in BC","A body of water between Vancouver Island and Washington State","A northern waterway","A Gulf Island passage"], answer:1 },
  { id:478, set:8, category:"Who Are Canadians", question:"What are 'landed immigrants'?", options:["Farmers in Canada","People who have been granted permanent residence in Canada","Temporary farm workers","Citizens of Canada"], answer:1 },
  { id:479, set:9, category:"Canada's Economy", question:"What is the 'tar sands' controversy about?", options:["Oil production methods and environmental impact","Sand extraction for construction","The cost of gas","A trade dispute"], answer:0 },
  { id:480, set:10, category:"Modern Canada", question:"What was the 'Night of the Long Knives' in Canadian politics?", options:["A military event","A 1981 night of political negotiations leading to the constitutional agreement (excluding Quebec)","A Quebec referendum night","An election night crisis"], answer:1 },
  { id:481, set:11, category:"Atlantic Provinces", question:"What is the significance of Peggy's Cove?", options:["An oil platform","A picturesque fishing village in Nova Scotia, a famous Canadian landmark","A naval base","A Swissair memorial site only"], answer:1 },
  { id:482, set:12, category:"Quebec & Ontario", question:"What is Mount Royal in Montreal?", options:["A ski resort","A hill and park in the heart of Montreal, designed by Frederick Law Olmsted","A university","A government building"], answer:1 },
  { id:483, set:13, category:"Western Canada", question:"What are the Okanagan Valley's primary products?", options:["Oil and gas","Wine, fruit, and tourism","Lumber and mining","Technology and finance"], answer:1 },
  { id:484, set:14, category:"The North", question:"What is a 'shaman' in Indigenous northern cultures?", options:["A hunter","A spiritual healer and intermediary between the human and spirit worlds","A chief","A warrior"], answer:1 },
  { id:485, set:15, category:"Culture & Society", question:"What is the 'Just for Laughs' festival?", options:["A government comedy program","The world's largest comedy festival, held annually in Montreal","A Toronto event","A national comedy competition"], answer:1 },
  { id:486, set:16, category:"Aboriginal Peoples", question:"What is the 'Indian Act' in Canada?", options:["An act about India","A complex federal law governing many aspects of First Nations life, reserves, and status","An act for all Indigenous peoples","An outdated act, now repealed"], answer:1 },
  { id:487, set:17, category:"Provincial Government", question:"What is the 'Clarity Act' and who passed it?", options:["An environmental act by Ralph Klein","Federal legislation setting conditions for any province to separate, passed by Chrétien government","A Quebec act","A constitutional amendment"], answer:1 },
  { id:488, set:18, category:"Military & Peacekeeping", question:"What is CANSOFCOM?", options:["A military communications system","Canadian Special Operations Forces Command — Canada's elite military units","A NATO special forces unit","A US-Canada combined force"], answer:1 },
  { id:489, set:19, category:"Applying for Citizenship", question:"Do permanent residents have to pay income tax in Canada?", options:["No, only citizens pay taxes","Yes, permanent residents must file and pay taxes like citizens","Only if they earn over a certain amount","Only if they own property"], answer:1 },
  { id:490, set:20, category:"General Knowledge", question:"What is 'bilingualism' at the federal level?", options:["All Canadians must be bilingual","Federal government services are provided in both English and French","Quebec is officially bilingual","Bilingualism is voluntary"], answer:1 },
  { id:491, set:1, category:"Rights & Responsibilities", question:"What is the significance of the Magna Carta to Canadian law?", options:["It has no connection to Canada","It is a foundational document that influenced Canadian concepts of rights and rule of law","It is Canada's constitution","It was signed in Canada"], answer:1 },
  { id:492, set:2, category:"Canadian History", question:"What is the significance of the National Policy (1879)?", options:["A trade agreement","John A. Macdonald's plan with tariffs, railways, and settlement to build Canada","An immigration plan","A military policy"], answer:1 },
  { id:493, set:3, category:"Canadian Government", question:"What is the 'Auditor General'?", options:["A senior judge","An independent officer who audits federal government spending and reports to Parliament","A Cabinet minister","A provincial official"], answer:1 },
  { id:494, set:4, category:"Federal Elections", question:"What is the 'electoral map' of Canada?", options:["A map of polling stations","A map showing the boundaries of all electoral ridings in Canada","A map of political party headquarters","A demographic map"], answer:1 },
  { id:495, set:5, category:"Justice System", question:"What is 'restorative justice'?", options:["Restoring old laws","A justice approach that focuses on rehabilitation and repairing harm rather than punishment","Restoring a criminal's rights","A type of pardoning"], answer:1 },
  { id:496, set:6, category:"Canadian Symbols", question:"What is the Parliament Hill complex?", options:["A government-owned hotel","The home of the federal Parliament and one of Canada's most iconic landmarks in Ottawa","A historic fort","A provincial legislature"], answer:1 },
  { id:497, set:7, category:"Canadian Geography", question:"What is Lake Superior?", options:["A man-made reservoir","The world's largest freshwater lake by surface area, bordering Ontario and the US","Canada's deepest lake","A lake in Quebec"], answer:1 },
  { id:498, set:8, category:"Who Are Canadians", question:"What is 'chain migration'?", options:["A type of prisoner transport","When immigrants bring family members to join them in a new country","A type of travel visa","A historical term for railway workers"], answer:1 },
  { id:499, set:20, category:"General Knowledge", question:"What is IRCC?", options:["International Relations Canada Council","Immigration, Refugees and Citizenship Canada — the federal department managing immigration","Internal Revenue Canada Corporation","International Refugee and Citizenship Commission"], answer:1 },
  { id:500, set:20, category:"General Knowledge", question:"What does it mean to be a Canadian citizen?", options:["Having a Canadian address","Belonging to Canada — with full rights and responsibilities including voting, a passport, and serving on juries","Having a job in Canada","Being born in Canada only"], answer:1 },
];

const SETS = Array.from({length: 20}, (_, i) => ({
  id: i + 1,
  name: `Set ${i + 1}`,
  category: [...new Set(QUESTION_BANK.filter(q => q.set === i + 1).map(q => q.category))][0],
  questions: QUESTION_BANK.filter(q => q.set === i + 1)
}));

// Shuffle array
const shuffle = arr => [...arr].sort(() => Math.random() - 0.5);

// Storage keys
const STORAGE_KEY = "canada_cit_app_v2";

function loadState() {
  try {
    const s = localStorage.getItem(STORAGE_KEY);
    return s ? JSON.parse(s) : null;
  } catch { return null; }
}

function saveState(s) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(s)); } catch {}
}

const initialState = {
  streak: 0,
  longestStreak: 0,
  lastStudyDate: null,
  totalAnswered: 0,
  totalCorrect: 0,
  setProgress: {},
  mockHistory: [],
  studyHistory: [],
};

export default function App() {
  const [state, setState] = useState(() => {
    const saved = loadState();
    return saved ? { ...initialState, ...saved } : initialState;
  });
  const [screen, setScreen] = useState("home"); // home | study | mock | results | history
  const [currentSet, setCurrentSet] = useState(null);
  const [mockQuestions, setMockQuestions] = useState([]);
  const [qi, setQi] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [sessionScore, setSessionScore] = useState({ correct: 0, total: 0 });
  const [mockAnswers, setMockAnswers] = useState([]);
  const [isMock, setIsMock] = useState(false);
  const [mockTimeLeft, setMockTimeLeft] = useState(1800);
  const [mockActive, setMockActive] = useState(false);
  const [selectedMockSet, setSelectedMockSet] = useState(null);

  // persist state
  useEffect(() => { saveState(state); }, [state]);

  // streak check on mount
  useEffect(() => {
    const today = new Date().toDateString();
    if (state.lastStudyDate && state.lastStudyDate !== today) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      if (state.lastStudyDate !== yesterday.toDateString()) {
        setState(s => ({ ...s, streak: 0 }));
      }
    }
  }, []);

  // mock timer
  useEffect(() => {
    let t;
    if (mockActive && mockTimeLeft > 0) {
      t = setTimeout(() => setMockTimeLeft(v => v - 1), 1000);
    } else if (mockActive && mockTimeLeft === 0) {
      finishMock();
    }
    return () => clearTimeout(t);
  }, [mockActive, mockTimeLeft]);

  const updateStreak = () => {
    const today = new Date().toDateString();
    setState(s => {
      const isNewDay = s.lastStudyDate !== today;
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const isConsecutive = s.lastStudyDate === yesterday.toDateString();
      const newStreak = isNewDay ? (isConsecutive ? s.streak + 1 : 1) : s.streak;
      return {
        ...s,
        streak: newStreak,
        longestStreak: Math.max(s.longestStreak, newStreak),
        lastStudyDate: today,
      };
    });
  };

  const startStudy = (set) => {
    setCurrentSet(set);
    setQi(0);
    setSelected(null);
    setShowAnswer(false);
    setSessionScore({ correct: 0, total: 0 });
    setIsMock(false);
    setScreen("study");
    updateStreak();
  };

  const startMock = (setId) => {
    const pool = setId === "random"
      ? shuffle(QUESTION_BANK).slice(0, 20)
      : shuffle(SETS.find(s => s.id === setId)?.questions || QUESTION_BANK.filter(q => q.set === setId)).slice(0, 20);
    setMockQuestions(pool);
    setMockAnswers(Array(20).fill(null));
    setQi(0);
    setSelected(null);
    setShowAnswer(false);
    setSessionScore({ correct: 0, total: 0 });
    setIsMock(true);
    setMockTimeLeft(1800);
    setMockActive(true);
    setSelectedMockSet(setId);
    setScreen("mock");
    updateStreak();
  };

  const handleStudyAnswer = (idx) => {
    if (selected !== null) return;
    setSelected(idx);
    setShowAnswer(true);
    const q = currentSet.questions[qi];
    const correct = idx === q.answer;
    setSessionScore(s => ({ correct: s.correct + (correct ? 1 : 0), total: s.total + 1 }));
    setState(s => ({
      ...s,
      totalAnswered: s.totalAnswered + 1,
      totalCorrect: s.totalCorrect + (correct ? 1 : 0),
      setProgress: {
        ...s.setProgress,
        [currentSet.id]: {
          answered: (s.setProgress[currentSet.id]?.answered || 0) + 1,
          correct: (s.setProgress[currentSet.id]?.correct || 0) + (correct ? 1 : 0),
        }
      }
    }));
  };

  const handleMockAnswer = (idx) => {
    if (selected !== null) return;
    setSelected(idx);
    setMockAnswers(a => { const n = [...a]; n[qi] = idx; return n; });
  };

  const nextQuestion = () => {
    const questions = isMock ? mockQuestions : currentSet.questions;
    if (qi + 1 >= questions.length) {
      if (isMock) finishMock();
      else finishStudy();
    } else {
      setQi(qi + 1);
      setSelected(null);
      setShowAnswer(false);
    }
  };

  const finishStudy = () => {
    setState(s => ({
      ...s,
      studyHistory: [{ date: new Date().toDateString(), set: currentSet.name, ...sessionScore }, ...s.studyHistory.slice(0, 19)]
    }));
    setScreen("results");
  };

  const finishMock = () => {
    setMockActive(false);
    const correct = mockAnswers.reduce((acc, ans, i) => acc + (ans === mockQuestions[i]?.answer ? 1 : 0), 0);
    const score = { correct, total: mockQuestions.length, pass: correct >= 15 };
    setState(s => ({
      ...s,
      totalAnswered: s.totalAnswered + mockQuestions.length,
      totalCorrect: s.totalCorrect + correct,
      mockHistory: [{ date: new Date().toDateString(), set: selectedMockSet, ...score }, ...s.mockHistory.slice(0, 19)]
    }));
    setSessionScore(score);
    setScreen("results");
  };

  const pct = state.totalAnswered > 0 ? Math.round((state.totalCorrect / state.totalAnswered) * 100) : 0;

  // ── RENDER ─────────────────────────────────────────────────
  if (screen === "home") return <HomeScreen state={state} pct={pct} onStudy={startStudy} onMock={startMock} onHistory={() => setScreen("history")} sets={SETS} />;
  if (screen === "study") return <StudyScreen set={currentSet} qi={qi} selected={selected} showAnswer={showAnswer} onAnswer={handleStudyAnswer} onNext={nextQuestion} score={sessionScore} onHome={() => setScreen("home")} />;
  if (screen === "mock") return <MockScreen questions={mockQuestions} qi={qi} selected={selected} onAnswer={handleMockAnswer} onNext={nextQuestion} timeLeft={mockTimeLeft} answers={mockAnswers} onHome={() => { setMockActive(false); setScreen("home"); }} />;
  if (screen === "results") return <ResultsScreen isMock={isMock} score={sessionScore} mockQuestions={mockQuestions} mockAnswers={mockAnswers} onHome={() => setScreen("home")} onRetry={() => isMock ? startMock(selectedMockSet) : startStudy(currentSet)} />;
  if (screen === "history") return <HistoryScreen state={state} onHome={() => setScreen("home")} />;
  return null;
}

// ── HOME ───────────────────────────────────────────────────────────────────────
function HomeScreen({ state, pct, onStudy, onMock, onHistory, sets }) {
  const [tab, setTab] = useState("study");
  const [mockSetId, setMockSetId] = useState("random");

  return (
    <div style={{ minHeight:"100vh", background:"#0a1628", color:"#f0f4ff", fontFamily:"'Georgia', serif", padding:"0 0 40px 0" }}>
      {/* Header */}
      <div style={{ background:"linear-gradient(135deg,#0d1f3c 0%,#1a3a5c 50%,#0d2d4a 100%)", padding:"28px 20px 24px", borderBottom:"2px solid #c8a84b" }}>
        <div style={{ maxWidth:480, margin:"0 auto" }}>
          <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:8 }}>
            <span style={{ fontSize:32 }}>🍁</span>
            <div>
              <h1 style={{ margin:0, fontSize:20, fontWeight:700, letterSpacing:1, color:"#f0c84a" }}>CANADA CITIZENSHIP</h1>
              <p style={{ margin:0, fontSize:12, color:"#a0b4cc", letterSpacing:2 }}>TEST PREP — 500 QUESTIONS</p>
            </div>
          </div>
          {/* Ko-fi button */}
          <a href="https://ko-fi.com/jkcoffee" target="_blank" rel="noopener noreferrer" style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:8, marginTop:14, padding:"9px 16px", background:"#FF5E5B", borderRadius:10, textDecoration:"none", color:"#fff", fontSize:13, fontWeight:700, fontFamily:"Georgia,serif", letterSpacing:0.3 }}>
            ☕ Support this free app on Ko-fi
          </a>

          {/* Stats bar */}
          <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:8, marginTop:12 }}>
            {[
              { label:"🔥 Streak", value: state.streak + " day" + (state.streak!==1?"s":"") },
              { label:"✅ Correct", value: state.totalCorrect },
              { label:"📊 Accuracy", value: pct + "%" },
              { label:"🏆 Best", value: state.longestStreak + "d" },
            ].map(s => (
              <div key={s.label} style={{ background:"rgba(255,255,255,0.07)", borderRadius:10, padding:"8px 4px", textAlign:"center" }}>
                <div style={{ fontSize:11, color:"#7a9bbf", marginBottom:2 }}>{s.label}</div>
                <div style={{ fontSize:16, fontWeight:700, color:"#f0c84a" }}>{s.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth:480, margin:"0 auto", padding:"0 16px" }}>
        {/* Tabs */}
        <div style={{ display:"flex", margin:"20px 0 16px", background:"rgba(255,255,255,0.05)", borderRadius:12, padding:4 }}>
          {["study","mock","progress"].map(t => (
            <button key={t} onClick={() => setTab(t)} style={{ flex:1, padding:"8px 0", border:"none", borderRadius:10, cursor:"pointer", fontFamily:"Georgia,serif", fontSize:13, fontWeight:600, transition:"all 0.2s", background: tab===t ? "#c8a84b" : "transparent", color: tab===t ? "#0a1628" : "#7a9bbf", letterSpacing:0.5 }}>
              {t==="study"?"📚 Learn":t==="mock"?"📝 Mock Test":"📈 Progress"}
            </button>
          ))}
        </div>

        {/* STUDY TAB */}
        {tab==="study" && (
          <div>
            <p style={{ color:"#7a9bbf", fontSize:13, marginBottom:16 }}>Study all 500 questions organized into 20 topic sets</p>
            <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
              {sets.map(set => {
                const prog = state.setProgress[set.id];
                const done = prog?.answered || 0;
                const total = set.questions.length;
                const acc = done > 0 ? Math.round((prog.correct/done)*100) : null;
                return (
                  <button key={set.id} onClick={() => onStudy(set)} style={{ background:"rgba(255,255,255,0.06)", border:"1px solid rgba(200,168,75,0.2)", borderRadius:14, padding:"14px 16px", cursor:"pointer", textAlign:"left", transition:"all 0.2s", color:"#f0f4ff" }}>
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                      <div>
                        <div style={{ fontSize:13, fontWeight:700, color:"#f0c84a", marginBottom:2 }}>Set {set.id}: {set.category}</div>
                        <div style={{ fontSize:11, color:"#7a9bbf" }}>{total} questions</div>
                      </div>
                      <div style={{ textAlign:"right" }}>
                        {acc !== null ? <div style={{ fontSize:13, fontWeight:700, color: acc>=75?"#4ade80":"#f87171" }}>{acc}%</div> : <div style={{ fontSize:11, color:"#4a6080" }}>Not started</div>}
                        <div style={{ fontSize:10, color:"#4a6080" }}>{done}/{total} done</div>
                      </div>
                    </div>
                    {done > 0 && (
                      <div style={{ height:4, background:"rgba(255,255,255,0.1)", borderRadius:2, marginTop:8, overflow:"hidden" }}>
                        <div style={{ height:"100%", background:"#c8a84b", borderRadius:2, width:`${Math.min(100,(done/total)*100)}%`, transition:"width 0.3s" }} />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* MOCK TAB */}
        {tab==="mock" && (
          <div>
            <p style={{ color:"#7a9bbf", fontSize:13, marginBottom:16 }}>Simulate the real test: 20 questions, 30 min, need 75% to pass</p>
            <div style={{ background:"rgba(200,168,75,0.1)", border:"1px solid #c8a84b", borderRadius:14, padding:16, marginBottom:16 }}>
              <h3 style={{ margin:"0 0 12px", fontSize:14, color:"#f0c84a" }}>Select Mock Test</h3>
              <select value={mockSetId} onChange={e => setMockSetId(e.target.value==="random"?"random":Number(e.target.value))} style={{ width:"100%", padding:"10px 12px", borderRadius:8, border:"1px solid #4a6080", background:"#0d1f3c", color:"#f0f4ff", fontSize:13, fontFamily:"Georgia,serif", marginBottom:12 }}>
                <option value="random">🎲 Random (all topics)</option>
                {sets.map(s => <option key={s.id} value={s.id}>Set {s.id}: {s.category}</option>)}
              </select>
              <button onClick={() => onMock(mockSetId)} style={{ width:"100%", padding:"14px", background:"#c8a84b", color:"#0a1628", border:"none", borderRadius:10, cursor:"pointer", fontSize:15, fontWeight:700, fontFamily:"Georgia,serif", letterSpacing:0.5 }}>
                🚀 Start Mock Test
              </button>
            </div>
            {state.mockHistory.length > 0 && (
              <div>
                <h3 style={{ fontSize:14, color:"#f0c84a", marginBottom:10 }}>Recent Mock Tests</h3>
                {state.mockHistory.slice(0,5).map((m,i) => (
                  <div key={i} style={{ background:"rgba(255,255,255,0.05)", borderRadius:10, padding:"10px 14px", marginBottom:8, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                    <div>
                      <div style={{ fontSize:12, color:"#a0b4cc" }}>{m.date}</div>
                      <div style={{ fontSize:11, color:"#7a9bbf" }}>Set: {m.set==="random"?"Random":m.set}</div>
                    </div>
                    <div style={{ textAlign:"right" }}>
                      <div style={{ fontSize:16, fontWeight:700, color: m.pass?"#4ade80":"#f87171" }}>{m.correct}/20</div>
                      <div style={{ fontSize:11, fontWeight:600, color: m.pass?"#4ade80":"#f87171" }}>{m.pass?"PASS":"FAIL"}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* PROGRESS TAB */}
        {tab==="progress" && (
          <div>
            <div style={{ background:"rgba(255,255,255,0.05)", borderRadius:14, padding:16, marginBottom:16 }}>
              <h3 style={{ margin:"0 0 14px", fontSize:14, color:"#f0c84a" }}>Overall Progress</h3>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:14 }}>
                {[
                  { label:"Questions Answered", value:state.totalAnswered },
                  { label:"Correct Answers", value:state.totalCorrect },
                  { label:"Overall Accuracy", value:pct+"%", highlight: pct>=75 },
                  { label:"Mock Tests Taken", value:state.mockHistory.length },
                ].map(s => (
                  <div key={s.label} style={{ background:"rgba(255,255,255,0.05)", borderRadius:10, padding:12, textAlign:"center" }}>
                    <div style={{ fontSize:22, fontWeight:700, color: s.highlight ? "#4ade80" : "#f0c84a" }}>{s.value}</div>
                    <div style={{ fontSize:11, color:"#7a9bbf", marginTop:2 }}>{s.label}</div>
                  </div>
                ))}
              </div>
              <div style={{ height:8, background:"rgba(255,255,255,0.1)", borderRadius:4, overflow:"hidden" }}>
                <div style={{ height:"100%", background: pct>=75?"#4ade80":"#c8a84b", borderRadius:4, width:`${pct}%`, transition:"width 0.5s" }} />
              </div>
              <div style={{ display:"flex", justifyContent:"space-between", fontSize:10, color:"#4a6080", marginTop:4 }}>
                <span>0%</span><span style={{ color:"#f0c84a" }}>75% Pass</span><span>100%</span>
              </div>
            </div>
            <h3 style={{ fontSize:14, color:"#f0c84a", marginBottom:10 }}>Sets Completed</h3>
            {sets.map(set => {
              const prog = state.setProgress[set.id];
              const done = prog?.answered || 0;
              const acc = done > 0 ? Math.round((prog.correct/done)*100) : 0;
              return (
                <div key={set.id} style={{ marginBottom:8 }}>
                  <div style={{ display:"flex", justifyContent:"space-between", fontSize:12, marginBottom:4 }}>
                    <span style={{ color:"#a0b4cc" }}>Set {set.id}: {set.category}</span>
                    <span style={{ color: acc>=75?"#4ade80": done>0?"#f87171":"#4a6080" }}>{done>0?acc+"%":"—"}</span>
                  </div>
                  <div style={{ height:5, background:"rgba(255,255,255,0.08)", borderRadius:3, overflow:"hidden" }}>
                    <div style={{ height:"100%", background: acc>=75?"#4ade80":"#c8a84b", borderRadius:3, width:`${done>0?Math.min(100,(done/set.questions.length)*100):0}%` }} />
                  </div>
                </div>
              );
            })}
            <button onClick={onHistory} style={{ width:"100%", marginTop:16, padding:"12px", background:"rgba(200,168,75,0.1)", border:"1px solid #c8a84b", borderRadius:10, cursor:"pointer", color:"#f0c84a", fontSize:13, fontFamily:"Georgia,serif" }}>
              📋 View Full History
            </button>
            <a href="https://ko-fi.com/jkcoffee" target="_blank" rel="noopener noreferrer" style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:8, marginTop:12, padding:"11px", background:"#FF5E5B", borderRadius:10, textDecoration:"none", color:"#fff", fontSize:13, fontWeight:700, fontFamily:"Georgia,serif" }}>
              ☕ This app is free — support it on Ko-fi
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

// ── STUDY SCREEN ──────────────────────────────────────────────────────────────
function StudyScreen({ set, qi, selected, showAnswer, onAnswer, onNext, score, onHome }) {
  const q = set.questions[qi];
  if (!q) return null;
  const total = set.questions.length;
  const pct = Math.round((qi / total) * 100);

  return (
    <div style={{ minHeight:"100vh", background:"#0a1628", color:"#f0f4ff", fontFamily:"Georgia,serif", display:"flex", flexDirection:"column" }}>
      {/* Header */}
      <div style={{ background:"#0d1f3c", borderBottom:"1px solid rgba(200,168,75,0.3)", padding:"14px 16px" }}>
        <div style={{ maxWidth:480, margin:"0 auto" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10 }}>
            <button onClick={onHome} style={{ background:"none", border:"none", color:"#7a9bbf", cursor:"pointer", fontSize:13, fontFamily:"Georgia,serif" }}>← Back</button>
            <div style={{ fontSize:13, fontWeight:700, color:"#f0c84a" }}>Set {set.id}: {set.category}</div>
            <div style={{ fontSize:13, color:"#a0b4cc" }}>{qi+1}/{total}</div>
          </div>
          <div style={{ height:6, background:"rgba(255,255,255,0.1)", borderRadius:3, overflow:"hidden" }}>
            <div style={{ height:"100%", background:"#c8a84b", borderRadius:3, width:`${pct}%`, transition:"width 0.3s" }} />
          </div>
          <div style={{ display:"flex", justifyContent:"space-between", fontSize:11, color:"#4a6080", marginTop:4 }}>
            <span>✅ {score.correct} correct</span>
            <span>❌ {score.total - score.correct} wrong</span>
          </div>
        </div>
      </div>

      {/* Question */}
      <div style={{ flex:1, maxWidth:480, margin:"0 auto", padding:"24px 16px", width:"100%" }}>
        <div style={{ background:"rgba(255,255,255,0.04)", border:"1px solid rgba(200,168,75,0.2)", borderRadius:16, padding:20, marginBottom:20 }}>
          <div style={{ fontSize:10, color:"#c8a84b", letterSpacing:2, marginBottom:8 }}>QUESTION {qi+1}</div>
          <p style={{ margin:0, fontSize:16, lineHeight:1.6, fontWeight:600 }}>{q.question}</p>
        </div>

        <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
          {q.options.map((opt, i) => {
            let bg = "rgba(255,255,255,0.05)";
            let border = "1px solid rgba(255,255,255,0.1)";
            let color = "#f0f4ff";
            if (showAnswer) {
              if (i === q.answer) { bg="rgba(74,222,128,0.15)"; border="1px solid #4ade80"; color="#4ade80"; }
              else if (i === selected && selected !== q.answer) { bg="rgba(248,113,113,0.15)"; border="1px solid #f87171"; color="#f87171"; }
            } else if (selected === i) {
              bg="rgba(200,168,75,0.15)"; border="1px solid #c8a84b"; color="#f0c84a";
            }
            return (
              <button key={i} onClick={() => onAnswer(i)} style={{ background:bg, border, borderRadius:12, padding:"14px 16px", cursor:selected===null?"pointer":"default", textAlign:"left", color, fontSize:14, lineHeight:1.5, fontFamily:"Georgia,serif", transition:"all 0.2s" }}>
                <span style={{ fontWeight:700, marginRight:8 }}>{["A","B","C","D"][i]}.</span>{opt}
              </button>
            );
          })}
        </div>

        {showAnswer && (
          <div style={{ marginTop:16, background: selected===q.answer?"rgba(74,222,128,0.1)":"rgba(248,113,113,0.1)", border:`1px solid ${selected===q.answer?"#4ade80":"#f87171"}`, borderRadius:12, padding:14, textAlign:"center" }}>
            <div style={{ fontSize:20, marginBottom:4 }}>{selected===q.answer?"✅":"❌"}</div>
            <div style={{ fontSize:13, color: selected===q.answer?"#4ade80":"#f87171", fontWeight:700 }}>
              {selected===q.answer?"Correct!":"Incorrect — Correct answer: " + ["A","B","C","D"][q.answer]}
            </div>
          </div>
        )}

        {selected !== null && (
          <button onClick={onNext} style={{ width:"100%", marginTop:16, padding:"14px", background:"#c8a84b", color:"#0a1628", border:"none", borderRadius:12, cursor:"pointer", fontSize:15, fontWeight:700, fontFamily:"Georgia,serif" }}>
            {qi+1 < set.questions.length ? "Next Question →" : "Finish Set ✓"}
          </button>
        )}
      </div>
    </div>
  );
}

// ── MOCK SCREEN ───────────────────────────────────────────────────────────────
function MockScreen({ questions, qi, selected, onAnswer, onNext, timeLeft, answers, onHome }) {
  const q = questions[qi];
  if (!q) return null;
  const mins = Math.floor(timeLeft / 60);
  const secs = timeLeft % 60;
  const answered = answers.filter(a => a !== null).length;
  const isLast = qi + 1 >= questions.length;

  return (
    <div style={{ minHeight:"100vh", background:"#0a1628", color:"#f0f4ff", fontFamily:"Georgia,serif", display:"flex", flexDirection:"column" }}>
      <div style={{ background:"#0d1f3c", borderBottom:"1px solid rgba(200,168,75,0.3)", padding:"14px 16px" }}>
        <div style={{ maxWidth:480, margin:"0 auto" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10 }}>
            <button onClick={onHome} style={{ background:"none", border:"none", color:"#7a9bbf", cursor:"pointer", fontSize:13, fontFamily:"Georgia,serif" }}>✕ Quit</button>
            <div style={{ fontSize:13, fontWeight:700, color:"#f0c84a" }}>📝 MOCK TEST</div>
            <div style={{ fontSize:14, fontWeight:700, color: timeLeft<300?"#f87171":"#4ade80" }}>⏱ {mins}:{secs.toString().padStart(2,"0")}</div>
          </div>
          <div style={{ display:"flex", gap:4, flexWrap:"wrap" }}>
            {questions.map((_, i) => (
              <div key={i} style={{ width:20, height:6, borderRadius:2, background: answers[i]!==null?"#c8a84b": i===qi?"rgba(200,168,75,0.4)":"rgba(255,255,255,0.1)", transition:"background 0.2s" }} />
            ))}
          </div>
          <div style={{ fontSize:11, color:"#4a6080", marginTop:4 }}>{answered}/20 answered</div>
        </div>
      </div>

      <div style={{ flex:1, maxWidth:480, margin:"0 auto", padding:"24px 16px", width:"100%" }}>
        <div style={{ background:"rgba(255,255,255,0.04)", border:"1px solid rgba(200,168,75,0.2)", borderRadius:16, padding:20, marginBottom:20 }}>
          <div style={{ fontSize:10, color:"#c8a84b", letterSpacing:2, marginBottom:8 }}>QUESTION {qi+1} OF 20</div>
          <p style={{ margin:0, fontSize:16, lineHeight:1.6, fontWeight:600 }}>{q.question}</p>
        </div>

        <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
          {q.options.map((opt, i) => {
            const isSelected = selected === i || answers[qi] === i;
            return (
              <button key={i} onClick={() => onAnswer(i)} style={{ background: isSelected?"rgba(200,168,75,0.15)":"rgba(255,255,255,0.05)", border:`1px solid ${isSelected?"#c8a84b":"rgba(255,255,255,0.1)"}`, borderRadius:12, padding:"14px 16px", cursor:selected===null?"pointer":"default", textAlign:"left", color: isSelected?"#f0c84a":"#f0f4ff", fontSize:14, lineHeight:1.5, fontFamily:"Georgia,serif", transition:"all 0.2s" }}>
                <span style={{ fontWeight:700, marginRight:8 }}>{["A","B","C","D"][i]}.</span>{opt}
              </button>
            );
          })}
        </div>

        {selected !== null && (
          <button onClick={onNext} style={{ width:"100%", marginTop:20, padding:"14px", background:"#c8a84b", color:"#0a1628", border:"none", borderRadius:12, cursor:"pointer", fontSize:15, fontWeight:700, fontFamily:"Georgia,serif" }}>
            {isLast ? "Submit Test ✓" : "Next Question →"}
          </button>
        )}
      </div>
    </div>
  );
}

// ── RESULTS ───────────────────────────────────────────────────────────────────
function ResultsScreen({ isMock, score, mockQuestions, mockAnswers, onHome, onRetry }) {
  const [showReview, setShowReview] = useState(false);
  const passed = score.correct >= (isMock ? 15 : Math.ceil(score.total * 0.75));
  const pct = Math.round((score.correct / score.total) * 100);

  return (
    <div style={{ minHeight:"100vh", background:"#0a1628", color:"#f0f4ff", fontFamily:"Georgia,serif", padding:"32px 16px" }}>
      <div style={{ maxWidth:480, margin:"0 auto" }}>
        <div style={{ textAlign:"center", marginBottom:28 }}>
          <div style={{ fontSize:64, marginBottom:8 }}>{passed?"🏆":"📚"}</div>
          <h2 style={{ margin:"0 0 4px", fontSize:22, color: passed?"#4ade80":"#f0c84a" }}>{passed?(isMock?"PASSED!":"Great Job!"):(isMock?"NOT PASSED":"Keep Studying")}</h2>
          <p style={{ margin:0, fontSize:13, color:"#7a9bbf" }}>{isMock?"Canadian Citizenship Mock Test":"Study Session Complete"}</p>
        </div>

        <div style={{ background:"rgba(255,255,255,0.05)", borderRadius:16, padding:20, marginBottom:16 }}>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:12, textAlign:"center" }}>
            <div><div style={{ fontSize:28, fontWeight:700, color:"#4ade80" }}>{score.correct}</div><div style={{ fontSize:11, color:"#7a9bbf" }}>Correct</div></div>
            <div><div style={{ fontSize:28, fontWeight:700, color: pct>=75?"#4ade80":"#f87171" }}>{pct}%</div><div style={{ fontSize:11, color:"#7a9bbf" }}>Score</div></div>
            <div><div style={{ fontSize:28, fontWeight:700, color:"#f87171" }}>{score.total-score.correct}</div><div style={{ fontSize:11, color:"#7a9bbf" }}>Wrong</div></div>
          </div>
          {isMock && (
            <div style={{ marginTop:14, textAlign:"center", padding:"10px", background: passed?"rgba(74,222,128,0.1)":"rgba(248,113,113,0.1)", borderRadius:10, fontSize:13, color: passed?"#4ade80":"#f87171", fontWeight:700 }}>
              {passed?"✅ You passed! Need ≥15/20 (75%)" : "❌ Need 15/20 (75%) to pass. Keep studying!"}
            </div>
          )}
        </div>

        {isMock && (
          <button onClick={() => setShowReview(!showReview)} style={{ width:"100%", marginBottom:12, padding:"12px", background:"rgba(200,168,75,0.1)", border:"1px solid #c8a84b", borderRadius:10, cursor:"pointer", color:"#f0c84a", fontSize:13, fontFamily:"Georgia,serif" }}>
            {showReview?"Hide":"Review"} Answers
          </button>
        )}

        {showReview && isMock && (
          <div style={{ marginBottom:16 }}>
            {mockQuestions.map((q, i) => {
              const userAns = mockAnswers[i];
              const correct = userAns === q.answer;
              return (
                <div key={i} style={{ background:"rgba(255,255,255,0.04)", border:`1px solid ${correct?"rgba(74,222,128,0.3)":"rgba(248,113,113,0.3)"}`, borderRadius:12, padding:14, marginBottom:10 }}>
                  <div style={{ fontSize:11, color: correct?"#4ade80":"#f87171", fontWeight:700, marginBottom:6 }}>{correct?"✅ Correct":"❌ Wrong"} — Q{i+1}</div>
                  <div style={{ fontSize:13, marginBottom:8, color:"#d0dff0" }}>{q.question}</div>
                  {userAns !== null && userAns !== q.answer && <div style={{ fontSize:12, color:"#f87171", marginBottom:4 }}>Your answer: {q.options[userAns]}</div>}
                  <div style={{ fontSize:12, color:"#4ade80" }}>✓ {q.options[q.answer]}</div>
                </div>
              );
            })}
          </div>
        )}

        <div style={{ display:"flex", gap:10 }}>
          <button onClick={onRetry} style={{ flex:1, padding:"13px", background:"#c8a84b", color:"#0a1628", border:"none", borderRadius:10, cursor:"pointer", fontSize:14, fontWeight:700, fontFamily:"Georgia,serif" }}>
            🔄 Try Again
          </button>
          <button onClick={onHome} style={{ flex:1, padding:"13px", background:"rgba(255,255,255,0.07)", color:"#f0f4ff", border:"1px solid rgba(255,255,255,0.15)", borderRadius:10, cursor:"pointer", fontSize:14, fontFamily:"Georgia,serif" }}>
            🏠 Home
          </button>
        </div>
      </div>
    </div>
  );
}

// ── HISTORY ───────────────────────────────────────────────────────────────────
function HistoryScreen({ state, onHome }) {
  return (
    <div style={{ minHeight:"100vh", background:"#0a1628", color:"#f0f4ff", fontFamily:"Georgia,serif", padding:"24px 16px" }}>
      <div style={{ maxWidth:480, margin:"0 auto" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}>
          <h2 style={{ margin:0, color:"#f0c84a" }}>📋 History</h2>
          <button onClick={onHome} style={{ background:"none", border:"none", color:"#7a9bbf", cursor:"pointer", fontFamily:"Georgia,serif" }}>← Back</button>
        </div>
        <h3 style={{ fontSize:14, color:"#a0b4cc", marginBottom:10 }}>Mock Tests</h3>
        {state.mockHistory.length === 0 ? <p style={{ color:"#4a6080", fontSize:13 }}>No mock tests taken yet</p> : state.mockHistory.map((m,i) => (
          <div key={i} style={{ background:"rgba(255,255,255,0.05)", borderRadius:10, padding:"12px 16px", marginBottom:8, display:"flex", justifyContent:"space-between" }}>
            <div><div style={{ fontSize:12 }}>{m.date}</div><div style={{ fontSize:11, color:"#7a9bbf" }}>Set {m.set==="random"?"Random":m.set}</div></div>
            <div style={{ textAlign:"right" }}><div style={{ fontSize:16, fontWeight:700, color: m.pass?"#4ade80":"#f87171" }}>{m.correct}/20</div><div style={{ fontSize:11, color: m.pass?"#4ade80":"#f87171" }}>{m.pass?"PASS":"FAIL"}</div></div>
          </div>
        ))}
        <h3 style={{ fontSize:14, color:"#a0b4cc", marginBottom:10, marginTop:20 }}>Study Sessions</h3>
        {state.studyHistory.length === 0 ? <p style={{ color:"#4a6080", fontSize:13 }}>No study sessions yet</p> : state.studyHistory.map((s,i) => (
          <div key={i} style={{ background:"rgba(255,255,255,0.05)", borderRadius:10, padding:"12px 16px", marginBottom:8, display:"flex", justifyContent:"space-between" }}>
            <div><div style={{ fontSize:12 }}>{s.date}</div><div style={{ fontSize:11, color:"#7a9bbf" }}>{s.set}</div></div>
            <div style={{ textAlign:"right" }}><div style={{ fontSize:16, fontWeight:700, color:"#f0c84a" }}>{s.correct}/{s.total}</div><div style={{ fontSize:11, color:"#7a9bbf" }}>{Math.round((s.correct/s.total)*100)}%</div></div>
          </div>
        ))}
      </div>
    </div>
  );
}
