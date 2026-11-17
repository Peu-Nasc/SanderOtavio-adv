(function () {
      "use strict";

      /* ===== 1. CONFIGURAÇÃO CENTRAL (Editar telefone WhatsApp e GTM aqui) ===== */
      var CFG = {
        phone: "5571984241279",
        gtm: "GTM-XXXXXXXX"
      };

      /* ===== 2. CAPTURA DE UTM E EVENTOS GTM/DATALAYER ===== */
      var utm = "";
      try {
        var q = location.search.slice(1);
        if (q && /utm_|gclid|fbclid/.test(q)) sessionStorage.setItem("utm", q);
        utm = sessionStorage.getItem("utm") || "";
      } catch (e) {}

      window.dataLayer = window.dataLayer || [];
      function track(ev, extra) {
        var o = { event: ev };
        for (var k in extra) o[k] = extra[k];
        window.dataLayer.push(o);
      }

      window.buildWaUrl = function (msg) {
        var text = msg + (utm ? " [origem: " + utm + "]" : "");
        return "https://wa.me/" + CFG.phone + "?text=" + encodeURIComponent(text);
      };

      /* ===== 3. DADOS DO TICKER ROTATIVO ===== */
      var TICKERS = [
        { tag: "VOCÊ SABIA?", text: "Brasileiros natos podem requerer a nacionalidade espanhola após 2 anos de residência legal continuada." },
        { tag: "ESTUDO & TRABALHO", text: "Estudantes e profissionais qualificados têm caminhos específicos nos EUA, Canadá, Portugal e Espanha mediante planejamento jurídico." },
        { tag: "AÇÃO REVISIONAL", text: "Financiamentos de veículos, imóveis e empréstimos com encargos abusivos podem passar por perícia e revisão contratual." },
        { tag: "DEFESA CRIMINAL 24H", text: "Atendimento imediato em delegacias, audiências de custódia, Habeas Corpus e defesa penal sigilosa no Rio de Janeiro." },
        { tag: "PREVIDENCIÁRIO", text: "Tempo de contribuição no INSS pode ser somado com períodos trabalhados nos EUA, Portugal, Espanha e Canadá." }
      ];
      var tickerIdx = 0;
      window.nextTicker = function () {
        tickerIdx = (tickerIdx + 1) % TICKERS.length;
        var b = document.getElementById("ticker-badge");
        var t = document.getElementById("ticker-text");
        if (b && t) {
          b.textContent = TICKERS[tickerIdx].tag;
          t.textContent = TICKERS[tickerIdx].text;
        }
      };
      setInterval(window.nextTicker, 5200);

      /* ===== 4. GATILHOS DE OBJETIVO INTERNACIONAL (SOLICITADOS NO ÁUDIO DO DR. SANDER) ===== */
      var GOAL_TRIGGERS = {
        estudo: {
          badge: "GATILHO DE PERFIL • ESTUDANTES & INTERCÂMBIO",
          title: "🎓 Vistos de Estudante, Pós-Graduação e Intercâmbio (EUA, Canadá, Portugal e Espanha)",
          viability: "Existe ampla possibilidade de obtenção do visto de estudante quando o projeto acadêmico é demonstrado com clareza, comprovação financeira estruturada e vínculos consistentes. Em destinos como Canadá, Portugal e Espanha, o visto de estudo pode inclusive permitir trabalho parcial e futura transição para residência legal.",
          checklist: [
            "Carta de aceitação (I-20 nos EUA, LOA no Canadá ou matrícula em Portugal/Espanha)",
            "Comprovação de capacidade financeira própria ou de patrocinador familiar (Sponsor)",
            "Demonstração estratégica de histórico acadêmico/profissional e plano de estudos coerente",
            "Orientação completa para entrevista consular ou mudança/extensão de status"
          ],
          waText: "Olá, Dr. Sander! Cliquei na opção de Visto para ESTUDANTE (EUA/Canadá/Europa) no site e gostaria de entender as possibilidades para o meu perfil."
        },
        trabalho: {
          badge: "GATILHO DE PERFIL • TRABALHO & CARREIRA QUALIFICADA",
          title: "💼 Vistos de Trabalho, Habilidades e Nômade Digital (EB-2 NIW, O-1, Express Entry, D8)",
          viability: "Profissionais com graduação, pós-graduação, experiência sólida ou renda remota possuem caminhos concretos de imigração legal — muitas vezes sem necessidade de oferta prévia de emprego (como o EB-2 NIW nos Estados Unidos ou os vistos de Nômade Digital em Portugal e Espanha).",
          checklist: [
            "Análise de currículo, tempo de experiência comprovada e formação acadêmica",
            "Verificação de elegibilidade para Green Card por Interesse Nacional (EB-2 NIW) ou Habilidade Extraordinária (EB-1 / O-1)",
            "Avaliação de contratos de prestação de serviço remoto para Visto D8 (Portugal) ou Nômade Digital (Espanha)",
            "Planejamento de pontuação para Express Entry / Programas Provinciais no Canadá"
          ],
          waText: "Olá, Dr. Sander! Cliquei na opção de Visto de TRABALHO / CARREIRA INTERNACIONAL no site e gostaria de avaliar meu perfil profissional."
        },
        investir: {
          badge: "GATILHO DE PERFIL • INVESTIDORES & EMPRESÁRIOS",
          title: "📈 Vistos de Investimento, Abertura de Empresa e Transferência de Executivos",
          viability: "Empresários, sócios e investidores podem estruturar a expansão de seus negócios ou proteção patrimonial no exterior vinculada à autorização de residência para toda a família (cônjuge e filhos), com segurança societária e tributária.",
          checklist: [
            "Estruturação de empresa nos EUA (L-1 para transferência de executivos, E-2 para dupla cidadania ou EB-5)",
            "Visto D2 para Empreendedores e abertura de sociedade em Portugal",
            "Comprovação de origem lícita de capital e elaboração jurídica do Plano de Negócios (Business Plan)",
            "Integração com planejamento empresarial e tributário internacional"
          ],
          waText: "Olá, Dr. Sander! Cliquei na opção de Visto para INVESTIDOR / EMPRESÁRIO no site e gostaria de agendar uma análise."
        },
        familia: {
          badge: "GATILHO DE PERFIL • RENDA PRÓPRIA, FAMÍLIA & CIDADANIA",
          title: "🏡 Residência por Renda Própria (D7), Aposentados, Reagrupamento e Dupla Cidadania",
          viability: "Para quem possui aposentadoria, rendimentos de aluguéis, dividendos ou reservas financeiras, ou ainda descendência europeia, há caminhos diretos de residência legal e obtenção de passaporte europeu (como a cidadania espanhola após 2 anos de residência legal para brasileiros).",
          checklist: [
            "Comprovação de rendimentos passivos regulares (Visto D7 Portugal ou Residência Não Lucrativa Espanha)",
            "Reagrupamento familiar para cônjuge, filhos e dependentes legais",
            "Análise documental para Nacionalidade Portuguesa (filhos/netos) ou Cidadania Espanhola por residência de 2 anos",
            "Planejamento previdenciário internacional integrado ao processo migratório"
          ],
          waText: "Olá, Dr. Sander! Cliquei na opção de Visto por RENDA PRÓPRIA / FAMÍLIA / CIDADANIA no site e gostaria de orientação."
        }
      };

      /* ===== 5. DADOS COMPLETOS DOS 4 PAÍSES DE VISTOS ===== */
      var COUNTRIES = {
        eua: {
          code: "EUA", name: "Estados Unidos", flag: "🇺🇸",
          badge: "EB-2 NIW • EB-1 • O-1 • ESTUDANTE F-1 • B1/B2",
          tagline: "Carreira Qualificada, Estudo, Investimento e Turismo/Negócios nos EUA",
          image: "https://images.unsplash.com/photo-1485738422979-f5c462d49f74?auto=format&fit=crop&w=1000&q=80",
          visas: [
            {
              name: "💼 EB-2 NIW & Trabalho Qualificado",
              short: "Green Card para profissionais pós-graduados ou com experiência de destaque, sem oferta de emprego.",
              viability: "O visto EB-2 NIW (National Interest Waiver) permite que profissionais qualificados (engenheiros, médicos, dentistas, profissionais de TI, gestores, pesquisadores, pilotos, empreendedores, entre outros) solicitem residência permanente (Green Card) demonstrando que sua atuação tem mérito substancial e relevância para os Estados Unidos.",
              checklist: ["Diploma universitário (bacharelado + 5 anos de experiência progressiva ou pós-graduação)", "Histórico profissional consistente e conquistas na área", "Plano profissional estruturado para atuação nos EUA"]
            },
            {
              name: "🏆 EB-1 & O-1 (Habilidades Extraordinárias)",
              short: "Para profissionais com reconhecimento nacional ou internacional em negócios, ciências, artes ou esportes.",
              viability: "Destinado a profissionais no topo de sua área de atuação que possuam prêmios, publicações, cargos de liderança, remuneração diferenciada ou participação como avaliadores no setor.",
              checklist: ["Auditoria de critérios de elegibilidade junto ao USCIS", "Organização probatória robusta e cartas de recomendação técnica", "Extensão para cônjuge e filhos menores de 21 anos"]
            },
            {
              name: "📈 EB-5, L-1 & E-2 (Empresários e Investidores)",
              short: "Transferência de executivos, abertura de filial nos EUA ou investimento direto.",
              viability: "Se você já possui empresa ativa no Brasil (mínimo de 1 ano para L-1) ou capital para investimento direto nos Estados Unidos, há caminhos jurídicos estruturados para imigrar empreendendo.",
              checklist: ["Análise societária da empresa brasileira e estruturação da subsidiária americana", "Comprovação de capacidade operacional e financeira", "Planejamento migratório para o executivo e sua família"]
            },
            {
              name: "🎓 Visto de Estudante (F-1) & Turismo/Negócios (B1/B2)",
              short: "Graduação, pós, cursos de inglês, intercâmbio, mudança de status e visto consular B1/B2.",
              viability: "Para quem deseja estudar nos Estados Unidos ou obter o visto de turismo e negócios (inclusive após negativa anterior), a preparação técnica do formulário DS-160 e a orientação sobre vínculos aumentam drasticamente a segurança do pedido.",
              checklist: ["Análise de vínculos familiares, profissionais e patrimoniais no Brasil", "Planejamento financeiro compatível com o curso ou viagem", "Orientação estratégica individual para entrevista consular"]
            }
          ],
          opts: ["Trabalhar / Carreira (EB-2 NIW, EB-1, O-1)", "Estudar nos EUA (F-1 / Intercâmbio / Pós)", "Investir ou abrir empresa (L-1, E-2, EB-5)", "Visto de Turismo/Negócios (B1/B2) ou Família"]
        },
        pt: {
          code: "PT", name: "Portugal", flag: "🇵🇹",
          badge: "VISTO D7 • D8 NÔMADE • D4 ESTUDO • CIDADANIA",
          tagline: "Residência por Renda Própria, Trabalho Remoto, Estudo, Empreendedorismo e Nacionalidade",
          image: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?auto=format&fit=crop&w=1000&q=80",
          visas: [
            {
              name: "🏡 Visto D7 (Aposentados e Renda Própria)",
              short: "Para titulares de aposentadorias, pensões, aluguéis, dividendos ou rendimentos passivos.",
              viability: "O Visto D7 é uma das formas mais seguras de residir legalmente em Portugal com direito a reagrupamento familiar, exigindo a comprovação de rendimentos passivos regulares e reserva financeira em conta.",
              checklist: ["Comprovação de aposentadoria, pensão, aluguéis ou lucros/dividendos", "NIF português e organização documental de alojamento", "Extensão automática de direito de residência para a família"]
            },
            {
              name: "💻 Visto D8 (Nômade Digital & Trabalho Remoto)",
              short: "Para profissionais PJ ou CLT que prestam serviços remotamente do Brasil ou exterior.",
              viability: "Permite morar legalmente em Portugal mantendo seu trabalho ou empresa atual fora do território português, desde que atingida a média de rendimentos exigida pela legislação consular.",
              checklist: ["Contratos de prestação de serviços ou vínculo de trabalho remoto", "Comprovação de renda média mensal dos últimos 3 meses", "Residência fiscal e organização consular completa"]
            },
            {
              name: "🎓 Visto de Estudante (D4) & Trabalho Qualificado (D1/D2)",
              short: "Universidades, mestrados, cursos técnicos, contrato de trabalho ou abertura de empresa.",
              viability: "Excelente porta de entrada para jovens e profissionais que buscam qualificação acadêmica em universidades portuguesas ou que possuem proposta de trabalho / projeto empreendedor.",
              checklist: ["Carta de matrícula ou promessa de contrato de trabalho / plano societário", "Meios de subsistência e seguro saúde internacional", "Caminho legal para futura autorização de residência e cidadania"]
            },
            {
              name: "🇵🇹 Nacionalidade Portuguesa (Descendência ou Tempo)",
              short: "Pedidos de cidadania para filhos, netos, cônjuges ou por tempo de residência legal.",
              viability: "A cidadania portuguesa garante passaporte da União Europeia para você e seus descendentes. Realizamos desde a pesquisa e retificação de certidões até o protocolo nas Conservatórias.",
              checklist: ["Análise da árvore genealógica e certidões de nascimento/casamento", "Verificação de requisitos legais para filhos, netos ou casamento", "Protocolo jurídico direto e acompanhamento até o assento português"]
            }
          ],
          opts: ["Morar com renda própria / Aposentado (D7)", "Trabalhar remotamente — Nômade Digital (D8)", "Estudar (D4) ou Trabalhar/Empreender (D1/D2)", "Nacionalidade Portuguesa por descendência"]
        },
        ca: {
          code: "CA", name: "Canadá", flag: "🇨🇦",
          badge: "EXPRESS ENTRY • PNP • ESTUDO + TRABALHO",
          tagline: "Imigração Qualificada, Estudo com Permissão de Trabalho e Programas Provinciais",
          image: "https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=1000&q=80",
          visas: [
            {
              name: "🍁 Express Entry & Imigração Qualificada",
              short: "Residência permanente baseada em formação, idade, experiência profissional e idioma.",
              viability: "O sistema federal canadense seleciona profissionais qualificados com base em pontuação (CRS). Avaliamos estrategicamente como maximizar seu perfil para aplicação à residência permanente.",
              checklist: ["Equivalência acadêmica (ECA) e comprovação de experiência profissional", "Planejamento de proficiência em inglês ou francês", "Análise de categorias prioritárias (Saúde, STEM, Transporte, Educação)"]
            },
            {
              name: "🎓 Planejamento via Estudo + Trabalho (Study Permit)",
              short: "Colleges e universidades canadenses com permissão de trabalho e transição para residência.",
              viability: "Estudar no Canadá continua sendo uma das rotas mais estruturadas para qualificação e posterior permissão de trabalho pós-estudo (PGWP), exigindo um plano de estudos (Study Plan) juridicamente sólido.",
              checklist: ["Escolha de instituição elegível (DLI) e carta de aceitação", "Elaboração técnica de Carta de Intenção / Study Plan persuasivo", "Comprovação financeira e extensão para cônjuge/dependentes quando elegível"]
            },
            {
              name: "🏛️ Programas Provinciais (PNP) & Oferta de Trabalho",
              short: "Caminhos voltados às demandas específicas das províncias canadenses.",
              viability: "Cada província do Canadá possui listas próprias de ocupações em demanda, permitindo indicação provincial que adiciona pontos decisivos para a residência permanente.",
              checklist: ["Mapeamento da sua profissão no sistema NOC/TEER canadense", "Identificação das províncias com maior aderência ao seu perfil", "Organização completa do dossiê imigratório"]
            },
            {
              name: "✈️ Visto de Visitante, Negócios & Reunificação Familiar",
              short: "Visto consular canadense (TRV), eTA e patrocínio familiar (Family Sponsorship).",
              viability: "Assessoria completa para pedidos de visto de turismo/negócios, reaplicação após negativa anterior ou processos de reunificação familiar no Canadá.",
              checklist: ["Auditoria de vínculos no Brasil e histórico de viagens", "Análise de GCMS Notes em caso de negativa prévia", "Preparo documental completo"]
            }
          ],
          opts: ["Imigração qualificada (Express Entry / PNP)", "Estudar no Canadá + Permissão de Trabalho", "Visto de Trabalho ou Empreendedorismo", "Turismo, Negócios ou Família"]
        },
        es: {
          code: "ES", name: "Espanha", flag: "🇪🇸",
          badge: "NÔMADE DIGITAL • ESTUDO • CIDADANIA EM 2 ANOS",
          tagline: "Trabalho Remoto, Estudo, Residência Não Lucrativa e Passaporte Europeu Rápido",
          image: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?auto=format&fit=crop&w=1000&q=80",
          visas: [
            {
              name: "💻 Visto de Nômade Digital (Teletrabalho Internacional)",
              short: "Morar legalmente na Espanha trabalhando remotamente para empresas ou clientes fora da Espanha.",
              viability: "Regulamentado pela Lei de Startups espanhola, permite autorização de residência (inicialmente de até 3 anos quando solicitada diretamente na Espanha) e conta tempo para a cidadania espanhola em 2 anos.",
              checklist: ["Contrato de trabalho remoto ou prestação de serviços (PJ/Autônomo) há pelo menos 3 meses", "Comprovação de renda mensal exigida pelo SMI espanhol", "Direito de levar cônjuge e filhos com permissão de trabalho"]
            },
            {
              name: "🏡 Residência Não Lucrativa (Renda Própria / Aposentados)",
              short: "Para famílias, aposentados e investidores com reservas ou renda passiva comprovada.",
              viability: "Ideal para quem deseja viver na Espanha com qualidade de vida sem exercer atividade laboral local, utilizando rendimentos do Brasil ou reservas bancárias.",
              checklist: ["Comprovação do indicador IPREM para o titular e dependentes", "Seguro de saúde privado sem copagamento válido na Espanha", "Contagem integral de prazo para a nacionalidade espanhola em 2 anos"]
            },
            {
              name: "🇪🇸 Nacionalidade Espanhola (2 Anos de Residência ou Descendência)",
              short: "Brasileiros natos têm direito a requerer a cidadania espanhola após apenas 2 anos de residência legal.",
              viability: "Enquanto cidadãos de outras nacionalidades precisam aguardar 10 anos, o Código Civil Espanhol concede aos ibero-americanos (incluindo brasileiros) o direito à cidadania com apenas 2 anos de residência legal e continuada.",
              checklist: ["Verificação da regularidade e continuidade da residência legal (Não conta estada de estudo)", "Orientação para exames DELE (dispensado em casos específicos) e CCSE", "Protocolo eletrônico rápido por via profissional"]
            },
            {
              name: "🎓 Visto de Estudante & Modificação para Trabalho",
              short: "Graduação, mestrado, cursos superiores e transição legal para residência e trabalho.",
              viability: "A Espanha permite que estudantes de ensino superior ou formação qualificada tenham autorização para trabalhar até 30 horas semanais e, ao concluir os estudos, modifiquem a autorização para residência e trabalho.",
              checklist: ["Matrícula em instituição de ensino reconhecida na Espanha", "Comprovação financeira e seguro médico completo", "Estratégia jurídica para futura modificação para residência legal"]
            }
          ],
          opts: ["Trabalho remoto — Nômade Digital", "Estudar na Espanha (Graduação / Pós / Cursos)", "Morar com Renda Própria (Não Lucrativa)", "Nacionalidade Espanhola (2 anos ou descendência)"]
        }
      };

      var activeCountryKey = "eua";
      var lastModalTrigger = null;
      var previousBodyOverflow = "";

      window.selectFlag = function (key) {
        activeCountryKey = key;
        renderHeroCarousel();
      };

      function renderHeroCarousel() {
        var tabsEl = document.getElementById("flag-tabs");
        var boxEl = document.getElementById("country-showcase");
        if (!tabsEl || !boxEl) return;

        var keys = Object.keys(COUNTRIES);
        tabsEl.innerHTML = keys.map(function (k) {
          var c = COUNTRIES[k];
          var isAct = k === activeCountryKey;
          return '<button onclick="selectFlag(\'' + k + '\')" class="py-3.5 px-2 flex flex-col sm:flex-row items-center justify-center gap-2 text-xs font-bold border-b-2 transition-all ' +
            (isAct ? 'bg-[#121f3d] text-[#e6c985] border-[#c9a45c]' : 'text-[#a9b2c4] border-transparent hover:text-white') + '">' +
            '<span class="text-xl">' + c.flag + '</span><span class="truncate">' + c.name + '</span></button>';
        }).join("");

        var cur = COUNTRIES[activeCountryKey];
        var visasHtml = cur.visas.map(function (v, idx) {
          return '<div onclick="openVisaDetailModal(\'' + activeCountryKey + '\', ' + idx + ')" class="cursor-pointer group p-3.5 rounded bg-[#0f1b38] hover:bg-[#16264c] border border-[#25365c] hover:border-[#c9a45c] transition-all">' +
            '<div class="flex items-start justify-between gap-2">' +
              '<h3 class="font-bold text-xs sm:text-sm text-white group-hover:text-[#e6c985]">' + v.name + '</h3>' +
              '<span class="text-[#c9a45c] text-xs font-bold shrink-0">Ver +</span>' +
            '</div>' +
            '<p class="text-[11px] text-[#a9b2c4] mt-1 line-clamp-2">' + v.short + '</p>' +
          '</div>';
        }).join("");

        boxEl.innerHTML =
          '<div class="relative h-44 sm:h-48 overflow-hidden">' +
            '<img src="' + cur.image + '" alt="' + cur.name + '" class="w-full h-full object-cover opacity-40">' +
            '<div class="absolute inset-0 bg-gradient-to-t from-[#121f3d] via-[#121f3d]/60 to-transparent"></div>' +
            '<div class="absolute bottom-4 left-6 right-6">' +
              '<span class="inline-block text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#0a1226] bg-[#c9a45c] px-2.5 py-0.5 rounded mb-1.5">' + cur.badge + '</span>' +
              '<h2 class="text-2xl sm:text-3xl font-bold text-white">' + cur.flag + ' ' + cur.name + '</h2>' +
              '<p class="text-xs text-[#dcd8cb] mt-0.5">' + cur.tagline + '</p>' +
            '</div>' +
          '</div>' +
          '<div class="p-5 sm:p-6 space-y-4">' +
            '<p class="text-[11px] text-[#e6c985] font-semibold uppercase tracking-wider">👇 Clique na categoria desejada para ver a viabilidade e falar no WhatsApp:</p>' +
            '<div class="grid grid-cols-1 sm:grid-cols-2 gap-3">' + visasHtml + '</div>' +
            '<div class="pt-3 border-t border-[#25365c] flex flex-col sm:flex-row items-center justify-between gap-3">' +
              '<button onclick="switchView(\'vistos\')" class="text-xs font-semibold text-[#e6c985] hover:underline">Abrir página completa de Vistos →</button>' +
              '<button onclick="openQuizFor(\'visto\', \'' + activeCountryKey + '\')" class="w-full sm:w-auto btn-gold text-xs px-4 py-2.5 rounded">Avaliar meu perfil para ' + cur.name + ' →</button>' +
            '</div>' +
          '</div>';
      }

      /* ===== FUNÇÕES DO MODAL DE VIABILIDADE DE VISTO (GATILHO DO DR. SANDER) ===== */
      window.openGoalModal = function (goalKey) {
        var g = GOAL_TRIGGERS[goalKey];
        if (!g) return;
        lastModalTrigger = document.activeElement;
        track("abertura_gatilho_objetivo", { objetivo: goalKey });
        var checks = g.checklist.map(function (item) {
          return '<li class="flex items-start gap-2.5 text-xs sm:text-sm text-[#dcd8cb]"><span class="text-[#c9a45c] font-bold">✓</span><span>' + item + '</span></li>';
        }).join("");

        var content = document.getElementById("visa-modal-content");
        content.innerHTML =
          '<span class="inline-block text-[10px] font-extrabold uppercase tracking-[0.18em] bg-[#c9a45c] text-[#0a1226] px-2.5 py-1 rounded mb-3">' + g.badge + '</span>' +
          '<h3 class="text-xl sm:text-2xl font-bold text-white mb-3">' + g.title + '</h3>' +
          '<div class="p-4 rounded bg-[#0a1226] border border-[#25365c] mb-5">' +
            '<p class="text-xs font-bold uppercase tracking-wider text-[#e6c985] mb-1">Análise de Possibilidade Jurídica:</p>' +
            '<p class="text-xs sm:text-sm text-[#c3cadb] leading-relaxed">' + g.viability + '</p>' +
          '</div>' +
          '<p class="text-xs font-bold uppercase tracking-wider text-[#c9a45c] mb-2.5">O que analisamos no seu atendimento inicial:</p>' +
          '<ul class="space-y-2 mb-6">' + checks + '</ul>' +
          '<div class="flex flex-col sm:flex-row gap-3 pt-4 border-t border-[#25365c]">' +
            '<a href="' + buildWaUrl(g.waText) + '" target="_blank" rel="noopener" class="flex-1 bg-[#25d366] hover:bg-[#20bd5a] text-[#06361b] font-extrabold text-xs sm:text-sm py-3.5 px-5 rounded text-center flex items-center justify-center gap-2">' +
              '<span>💬 Falar no WhatsApp sobre esta possibilidade</span>' +
            '</a>' +
            '<button onclick="closeVisaModal(); openQuizFor(\'visto\', \'eua\')" class="btn-gold text-xs sm:text-sm py-3.5 px-5 rounded">' +
              'Fazer Triagem Rápida (1 min) →' +
            '</button>' +
          '</div>';

        showVisaModal();
      };

      window.openVisaDetailModal = function (countryKey, visaIdx) {
        var c = COUNTRIES[countryKey];
        if (!c || !c.visas[visaIdx]) return;
        lastModalTrigger = document.activeElement;
        var v = c.visas[visaIdx];
        track("abertura_gatilho_visto", { pais: countryKey, visto: v.name });

        var checks = v.checklist.map(function (item) {
          return '<li class="flex items-start gap-2.5 text-xs sm:text-sm text-[#dcd8cb]"><span class="text-[#c9a45c] font-bold">✓</span><span>' + item + '</span></li>';
        }).join("");

        var waMsg = "Olá, Dr. Sander! Vi no site a explicação sobre " + v.name + " (" + c.name + ") e gostaria de avaliar as possibilidades para o meu caso.";

        var content = document.getElementById("visa-modal-content");
        content.innerHTML =
          '<span class="inline-block text-[10px] font-extrabold uppercase tracking-[0.18em] bg-[#c9a45c] text-[#0a1226] px-2.5 py-1 rounded mb-3">' + c.flag + ' ' + c.name + ' • ANÁLISE DE VIABILIDADE</span>' +
          '<h3 class="text-xl sm:text-2xl font-bold text-white mb-3">' + v.name + '</h3>' +
          '<div class="p-4 rounded bg-[#0a1226] border border-[#25365c] mb-5">' +
            '<p class="text-xs font-bold uppercase tracking-wider text-[#e6c985] mb-1">Entenda a possibilidade para o seu perfil:</p>' +
            '<p class="text-xs sm:text-sm text-[#c3cadb] leading-relaxed">' + v.viability + '</p>' +
          '</div>' +
          '<p class="text-xs font-bold uppercase tracking-wider text-[#c9a45c] mb-2.5">Pontos avaliados pela nossa equipe jurídica:</p>' +
          '<ul class="space-y-2 mb-6">' + checks + '</ul>' +
          '<div class="flex flex-col sm:flex-row gap-3 pt-4 border-t border-[#25365c]">' +
            '<a href="' + buildWaUrl(waMsg) + '" target="_blank" rel="noopener" class="flex-1 bg-[#25d366] hover:bg-[#20bd5a] text-[#06361b] font-extrabold text-xs sm:text-sm py-3.5 px-5 rounded text-center flex items-center justify-center gap-2">' +
              '<span>💬 Falar no WhatsApp sobre ' + c.name + '</span>' +
            '</a>' +
            '<button onclick="closeVisaModal(); openQuizFor(\'visto\', \'' + countryKey + '\')" class="btn-gold text-xs sm:text-sm py-3.5 px-5 rounded">' +
              'Responder Triagem (' + c.code + ') →' +
            '</button>' +
          '</div>';

        showVisaModal();
      };

      function showVisaModal() {
        var modal = document.getElementById("visa-modal");
        modal.classList.remove("hidden");
        previousBodyOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        document.getElementById("visa-modal-close").focus();
      }

      window.closeVisaModal = function () {
        var modal = document.getElementById("visa-modal");
        if (modal.classList.contains("hidden")) return;
        modal.classList.add("hidden");
        document.body.style.overflow = previousBodyOverflow;
        if (lastModalTrigger && typeof lastModalTrigger.focus === "function") lastModalTrigger.focus();
      };

      /* ===== 6. DADOS DAS 4 EDITORIAS JURÍDICAS UNIFICADAS ===== */
      var AREAS = {
        civel: {
          num: "01",
          title: "Direito Cível & Ação Revisional de Contratos",
          short: "Cível & Revisional",
          badge: "AÇÃO REVISIONAL • BUSCA E APREENSÃO • PATRIMÔNIO",
          desc: "Atuação forte na revisão técnica de contratos bancários (financiamentos de veículos, imóveis, empréstimos e capital de giro), defesa contra busca e apreensão, direito imobiliário, inventários e homologação de sentença estrangeira.",
          q: "Qual é a sua demanda na área Cível / Revisional?",
          opts: ["Ação Revisional de Financiamento de Veículo / Busca e Apreensão", "Revisão de Financiamento Imobiliário ou Empréstimo Bancário", "Inventário, Divórcio ou Homologação de Sentença Estrangeira (STJ)", "Contratos Imobiliários, Cobrança ou Indenização"],
          subs: [
            { t: "Ação Revisional de Contrato Bancário (Veículos e Imóveis)", d: "Auditoria contratual para combater juros remuneratórios abusivos, capitalização ilegal, tarifas ocultas e venda casada." },
            { t: "Defesa em Busca e Apreensão e Execuções Bancárias", d: "Medidas urgentes para proteção do bem, suspensão de liminares abusivas e renegociação judicial com deságio." },
            { t: "Direito Imobiliário, Contratos & Responsabilidade Civil", d: "Distratos imobiliários, regularização de imóveis, locações, elaboração de contratos e ações indenizatórias." },
            { t: "Família, Inventários & Sentença Estrangeira (STJ)", d: "Inventários judiciais e extrajudiciais, partilha de bens e homologação de divórcios estrangeiros no Brasil." }
          ]
        },
        previdenciario: {
          num: "02",
          title: "Benefícios Previdenciários (INSS & Internacional)",
          short: "Previdenciário",
          badge: "APOSENTADORIAS • AUXÍLIOS • BPC/LOAS • REVISÕES",
          desc: "Planejamento e concessão de aposentadorias, benefícios por incapacidade (auxílio-doença/invalidez), BPC/LOAS, pensão por morte, revisão de benefícios e utilização de tempo de trabalho no exterior via Acordos Internacionais.",
          q: "Qual é a sua necessidade previdenciária atual?",
          opts: ["Dar entrada ou planejar Aposentadoria (Idade, Tempo ou Especial)", "Benefício por Incapacidade (Auxílio-Doença / Invalidez) ou BPC/LOAS", "Revisão de Benefício já concedido ou Recurso contra negativa do INSS", "Previdenciário Internacional (Somar tempo Brasil + Exterior)"],
          subs: [
            { t: "Planejamento Previdenciário e Aposentadorias", d: "Cálculo técnico do CNIS, reconhecimento de tempo especial (insalubridade/periculosidade), rural ou períodos sem registro para garantir o melhor benefício." },
            { t: "Auxílio por Incapacidade, Acidente e BPC/LOAS", d: "Atuação administrativa e judicial rápida quando o INSS nega indevidamente o auxílio-doença, aposentadoria por invalidez ou o benefício assistencial." },
            { t: "Pensão por Morte e Revisão de Benefícios Concedidos", d: "Habilitação de dependentes em pensão por morte e auditoria da carta de concessão para aumentar o valor da renda mensal." },
            { t: "Previdenciário Internacional (Brasil + EUA / Europa / Canadá)", d: "Aplicação dos Acordos Previdenciários Internacionais para brasileiros que moram no exterior ou retornaram ao Brasil." }
          ]
        },
        empresarial: {
          num: "03",
          title: "Direito Empresarial & Internacionalização",
          short: "Empresarial",
          badge: "SOCIETÁRIO • HOLDINGS • EXPANSÃO INTERNACIONAL",
          desc: "Consultoria jurídica para empresários e sociedades, blindagem contratual, constituição de Holdings Familiares para proteção patrimonial e estruturação de empresas nos EUA e Europa.",
          q: "Qual é o foco da sua demanda empresarial?",
          opts: ["Internacionalização / Abertura de empresa nos EUA ou Europa", "Holding Familiar e Proteção Patrimonial", "Consultoria societária, contratos comerciais ou trabalhista patronal", "Gestão e revisão de passivo bancário empresarial (Capital de Giro)"],
          subs: [
            { t: "Internacionalização de Negócios (EUA, Portugal e Espanha)", d: "Abertura de empresas no exterior (LLC, Corp ou Sociedade Europeia) integrada ao planejamento migratório dos sócios." },
            { t: "Holdings Familiares & Proteção Patrimonial", d: "Estruturação societária lícita para proteção de ativos, economia tributária e planejamento sucessório familiar." },
            { t: "Consultoria Societária e Blindagem Contratual", d: "Acordos de sócios, contratos com fornecedores e clientes, compliance e prevenção de litígios." },
            { t: "Reestruturação de Passivos Bancários Empresariais", d: "Defesa de empresas contra cobranças bancárias abusivas em cédulas de crédito e capital de giro." }
          ]
        },
        criminal: {
          num: "04",
          title: "Advocacia Criminal 24h & Defesa Estratégica",
          short: "Criminal 24h",
          badge: "PLANTÃO 24H RJ • DELEGACIAS • CUSTÓDIA • HABEAS CORPUS",
          desc: "Defesa técnica intransigente e sigilosa 24 horas no Rio de Janeiro e em todo o Brasil. Atuação imediata em flagrantes, delegacias, audiências de custódia, inquéritos, processos criminais, Tribunal do Júri e Direito Penal Econômico.",
          q: "Qual é a natureza do atendimento criminal necessário?",
          opts: ["URGÊNCIA 24H: Prisão em flagrante, Delegacia ou Audiência de Custódia", "Defesa em Inquérito Policial, Processo Criminal ou Habeas Corpus", "Direito Penal Econômico, Empresarial ou Crimes Digitais", "Reabilitação Criminal / Parecer de Antecedentes para Visto"],
          subs: [
            { t: "Plantão Criminal 24h: Flagrantes & Audiência de Custódia", d: "Comparecimento imediato em delegacias do Rio de Janeiro, pedidos de relaxamento de prisão e liberdade provisória." },
            { t: "Habeas Corpus & Defesa em todas as Instâncias (TJRJ, STJ e STF)", d: "Combate técnico a prisões preventivas/temporárias ilegais e acompanhamento integral de ações penais." },
            { t: "Direito Penal Econômico, Empresarial e Tribunal do Júri", d: "Defesa especializada em crimes financeiros, tributários, lavagem de capitais, crimes digitais e plenário do Júri." },
            { t: "Reabilitação Criminal & Pareceres para Imigração", d: "Baixa de registros e elaboração de parecer jurídico técnico para evitar negativas consulares de vistos." }
          ]
        }
      };

      function renderAreasGrid() {
        var grid = document.getElementById("areas-grid");
        if (!grid) return;
        grid.innerHTML = Object.keys(AREAS).map(function (k) {
          var a = AREAS[k];
          var isCrim = k === "criminal";
          var subsHtml = a.subs.map(function (s) {
            return '<div class="flex items-start gap-2 text-xs text-[#dcd8cb]"><span class="text-[#c9a45c] font-bold">›</span><span>' + s.t + '</span></div>';
          }).join("");
          return '<article class="so-card p-7 sm:p-8 rounded flex flex-col justify-between ' + (isCrim ? 'border-t-[#dc2626]' : '') + '">' +
            '<div>' +
              '<div class="flex items-center justify-between gap-2 mb-4">' +
                '<span class="font-serif-title text-3xl text-[#c9a45c]">' + a.num + '</span>' +
                '<span class="text-[10px] font-bold uppercase tracking-widest bg-[#0a1226] ' + (isCrim ? 'text-[#f87171] border-[#dc2626]/50' : 'text-[#e6c985] border-[#25365c]') + ' px-3 py-1 border rounded">' + a.badge + '</span>' +
              '</div>' +
              '<h3 class="text-xl sm:text-2xl font-bold text-white mb-2">' + a.title + '</h3>' +
              '<p class="text-xs sm:text-sm text-[#a9b2c4] leading-relaxed mb-5">' + a.desc + '</p>' +
              '<div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-6 pt-4 border-t border-[#25365c]/80">' + subsHtml + '</div>' +
            '</div>' +
            '<div class="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-[#25365c]">' +
              '<button onclick="switchView(\'' + k + '\')" class="text-xs font-bold uppercase tracking-wider text-[#e6c985] hover:underline">Abrir Landing Page ' + a.short + ' →</button>' +
              '<button onclick="switchView(\'' + k + '\')" class="text-xs font-bold ' + (isCrim ? 'bg-[#dc2626] text-white hover:bg-[#b91c1c]' : 'text-[#0a1226] bg-[#c9a45c] hover:bg-[#e6c985]') + ' px-4 py-2.5 rounded">' +
                (isCrim ? '🚨 Plantão 24h & Defesa' : 'Ver Serviços & Simulador') +
              '</button>' +
            '</div>' +
          '</article>';
        }).join("");
      }

      /* ===== 7. LANDING PAGES INTERNAS ESPECIALIZADAS (COM ROTEAMENTO POR HASH) ===== */
      window.switchView = function (viewKey, skipHashUpdate) {
        var homeEl = document.getElementById("view-home");
        var dynEl = document.getElementById("view-dynamic-page");

        if (!skipHashUpdate) {
          try {
            history.replaceState(null, "", "#" + viewKey);
          } catch (e) {}
        }

        document.querySelectorAll(".nav-tab").forEach(function (btn) {
          var isCur = btn.getAttribute("data-nav") === viewKey;
          btn.className = "nav-tab px-3 py-2 text-xs font-bold uppercase tracking-wider transition-all rounded-t flex items-center gap-1.5 " +
            (isCur ? "text-[#e6c985] border-b-2 border-[#c9a45c] bg-[#121f3d]/60" : "text-[#dcd8cb] hover:text-[#e6c985]");
        });

        if (viewKey === "home" || !viewKey) {
          homeEl.classList.remove("hidden");
          dynEl.classList.add("hidden");
          window.scrollTo({ top: 0, behavior: "smooth" });
          return;
        }

        homeEl.classList.add("hidden");
        dynEl.classList.remove("hidden");

        if (viewKey === "vistos") {
          renderVistosLandingPage(dynEl);
        } else if (viewKey === "criminal") {
          renderCriminalLandingPage(dynEl);
        } else if (viewKey === "civel") {
          renderCivelLandingPage(dynEl);
        } else if (viewKey === "previdenciario") {
          renderPrevidenciarioLandingPage(dynEl);
        } else if (viewKey === "empresarial") {
          renderEmpresarialLandingPage(dynEl);
        }

        window.scrollTo({ top: 0, behavior: "smooth" });
      };

      /* --- 7.1 LANDING PAGE DE VISTOS INTERNACIONAIS (#vistos) --- */
      function renderVistosLandingPage(container) {
        var cardsCountries = Object.keys(COUNTRIES).map(function (ck) {
          var c = COUNTRIES[ck];
          var vList = c.visas.map(function (v, idx) {
            var waDirect = buildWaUrl("Olá, Dr. Sander! Estou na página de Vistos (" + c.name + ") e tenho interesse em: " + v.name);
            return '<li class="p-5 bg-[#0a1226]/80 border border-[#25365c] hover:border-[#c9a45c] rounded flex flex-col justify-between transition-all">' +
              '<div>' +
                '<strong class="text-white text-base block">' + v.name + '</strong>' +
                '<p class="text-xs text-[#a9b2c4] mt-1.5 leading-relaxed">' + v.viability + '</p>' +
              '</div>' +
              '<div class="mt-4 pt-3 border-t border-[#25365c]/70 flex flex-wrap items-center justify-between gap-2">' +
                '<button onclick="openVisaDetailModal(\'' + ck + '\', ' + idx + ')" class="text-xs font-bold text-[#e6c985] hover:underline">Ver checklist de documentos →</button>' +
                '<a href="' + waDirect + '" target="_blank" rel="noopener" class="text-xs font-extrabold bg-[#25d366] text-[#06361b] px-3 py-1.5 rounded">WhatsApp Direto</a>' +
              '</div>' +
            '</li>';
          }).join("");

          return '<div class="so-card p-6 sm:p-8 rounded space-y-5">' +
            '<div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#25365c] pb-4">' +
              '<div>' +
                '<h2 class="text-2xl sm:text-3xl font-bold text-white">' + c.flag + ' ' + c.name + '</h2>' +
                '<p class="text-xs sm:text-sm text-[#c3cadb] mt-1">' + c.tagline + '</p>' +
              '</div>' +
              '<span class="text-[10px] font-bold uppercase tracking-widest bg-[#0a1226] text-[#c9a45c] px-3 py-1.5 rounded border border-[#25365c] self-start">' + c.badge + '</span>' +
            '</div>' +
            '<ul class="grid grid-cols-1 md:grid-cols-2 gap-4">' + vList + '</ul>' +
            '<div class="pt-2 flex flex-wrap gap-3">' +
              '<button onclick="openQuizFor(\'visto\', \'' + ck + '\')" class="btn-gold text-xs px-5 py-3 rounded">Fazer Triagem de Perfil para ' + c.name + ' →</button>' +
            '</div>' +
          '</div>';
        }).join("");

        container.innerHTML =
          '<section class="hero-bg border-b border-[#25365c] py-12 sm:py-16">' +
            '<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">' +
              '<div>' +
                '<button onclick="switchView(\'home\')" class="text-xs font-bold uppercase tracking-wider text-[#c9a45c] hover:underline mb-3 block">← Voltar ao Início do Portal</button>' +
                '<span class="inline-block text-[10px] font-extrabold uppercase tracking-[0.2em] bg-[#c9a45c] text-[#0a1226] px-3 py-1 rounded mb-3">NÚCLEO DE MOBILIDADE INTERNACIONAL • S|O</span>' +
                '<h1 class="text-3xl sm:text-5xl font-bold text-white max-w-4xl leading-tight">Vistos e Imigração para <span class="gold-text">Estados Unidos, Portugal, Canadá e Espanha</span></h1>' +
                '<p class="text-sm sm:text-base text-[#c3cadb] mt-3 max-w-3xl">Clique abaixo no seu objetivo principal (Estudante, Trabalho, Investimento ou Família/Cidadania) para ver nossa explicação de viabilidade jurídica e iniciar seu atendimento pelo WhatsApp.</p>' +
              '</div>' +

              '<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">' +
                '<button onclick="openGoalModal(\'estudo\')" class="so-card p-5 rounded text-left group">' +
                  '<span class="text-2xl block mb-2">🎓</span>' +
                  '<h3 class="font-bold text-base text-white group-hover:text-[#e6c985]">Para Estudantes</h3>' +
                  '<p class="text-xs text-[#a9b2c4] mt-1">Intercâmbio, Graduação, Mestrado e Estudo + Trabalho.</p>' +
                  '<span class="text-xs font-bold text-[#c9a45c] mt-3 block">Ver possibilidade + WhatsApp →</span>' +
                '</button>' +
                '<button onclick="openGoalModal(\'trabalho\')" class="so-card p-5 rounded text-left group">' +
                  '<span class="text-2xl block mb-2">💼</span>' +
                  '<h3 class="font-bold text-base text-white group-hover:text-[#e6c985]">Para Ir a Trabalho</h3>' +
                  '<p class="text-xs text-[#a9b2c4] mt-1">EB-2 NIW, O-1, Express Entry, Visto D8 e Nômade Digital.</p>' +
                  '<span class="text-xs font-bold text-[#c9a45c] mt-3 block">Ver possibilidade + WhatsApp →</span>' +
                '</button>' +
                '<button onclick="openGoalModal(\'investir\')" class="so-card p-5 rounded text-left group">' +
                  '<span class="text-2xl block mb-2">📈</span>' +
                  '<h3 class="font-bold text-base text-white group-hover:text-[#e6c985]">Para Empresários</h3>' +
                  '<p class="text-xs text-[#a9b2c4] mt-1">Abertura de empresa no exterior, L-1, E-2, EB-5 e Visto D2.</p>' +
                  '<span class="text-xs font-bold text-[#c9a45c] mt-3 block">Ver possibilidade + WhatsApp →</span>' +
                '</button>' +
                '<button onclick="openGoalModal(\'familia\')" class="so-card p-5 rounded text-left group">' +
                  '<span class="text-2xl block mb-2">🏡</span>' +
                  '<h3 class="font-bold text-base text-white group-hover:text-[#e6c985]">Renda Própria & Cidadania</h3>' +
                  '<p class="text-xs text-[#a9b2c4] mt-1">Visto D7, Não Lucrativo e Cidadania Portuguesa/Espanhola.</p>' +
                  '<span class="text-xs font-bold text-[#c9a45c] mt-3 block">Ver possibilidade + WhatsApp →</span>' +
                '</button>' +
              '</div>' +
            '</div>' +
          '</section>' +
          '<section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">' +
            cardsCountries +
          '</section>';
      }

      /* --- 7.2 LANDING PAGE CRIMINAL 24H (#criminal) — MODELO RICARDO DO CARMO ADVOCACIA --- */
      function renderCriminalLandingPage(container) {
        var urgentWa = buildWaUrl("🚨 URGÊNCIA CRIMINAL 24H: Olá, Dr. Sander! Preciso de atendimento criminal imediato.");
        var consultWa = buildWaUrl("Olá, Dr. Sander! Gostaria de agendar uma consulta criminal sigilosa.");

        var crimServices = [
          {
            badge: "ATUAÇÃO IMEDIATA 24H",
            title: "Prisão em Flagrante & Acompanhamento em Delegacia",
            desc: "Comparecimento presencial imediato em delegacias Policiais Civis e Federais no Rio de Janeiro. Preservação dos direitos constitucionais do investigado desde o primeiro minuto.",
            wa: "Olá, Dr. Sander! Preciso de acompanhamento urgente para Prisão em Flagrante / Delegacia."
          },
          {
            badge: "LIBERDADE PROVISÓRIA",
            title: "Audiência de Custódia & Relaxamento de Prisão",
            desc: "Preparação técnica rigorosa e sustentação oral em Audiência de Custódia para demonstrar a ilegalidade da prisão ou a ausência de requisitos para a prisão preventiva.",
            wa: "Olá, Dr. Sander! Preciso de defesa técnica para Audiência de Custódia / Pedido de Liberdade."
          },
          {
            badge: "TRIBUNAIS SUPERIORES",
            title: "Habeas Corpus (TJRJ, TRF, STJ e STF)",
            desc: "Impetração estratégica de Habeas Corpus com pedido liminar para trancamento de inquérito, revogação de prisão preventiva/temporária e combate a constrangimentos ilegais.",
            wa: "Olá, Dr. Sander! Gostaria de falar sobre a impetração de um Habeas Corpus."
          },
          {
            badge: "INVESTIGAÇÃO & PROCESSO",
            title: "Defesa em Inquérito Policial & Ação Penal",
            desc: "Atuação defensiva artesanal desde a fase de investigação policial ou do Ministério Público até a instrução criminal, recursos de apelação e recursos especiais.",
            wa: "Olá, Dr. Sander! Preciso de orientação sobre um Inquérito Policial / Processo Criminal."
          },
          {
            badge: "EMPRESARIAL & FINANCEIRO",
            title: "Direito Penal Econômico, Tributário & Lavagem de Capitais",
            desc: "Defesa altamente especializada para empresários, sócios e gestores em apurações de crimes contra a ordem tributária, sistema financeiro, licitações e compliance penal.",
            wa: "Olá, Dr. Sander! Busco consultoria em Direito Penal Econômico / Empresarial."
          },
          {
            badge: "PLENÁRIO DO JÚRI",
            title: "Tribunal do Júri & Crimes contra a Vida",
            desc: "Defesa plena, combativa e estratégica em todas as fases do procedimento do Júri, com análise pericial de laudos e atuação incisiva em plenário.",
            wa: "Olá, Dr. Sander! Preciso de defesa especializada para processo no Tribunal do Júri."
          },
          {
            badge: "CRIMES CIBERNÉTICOS",
            title: "Crimes Digitais, Estelionato Eletrônico & Honra",
            desc: "Defesa técnica e assistência de acusação em crimes cibernéticos, fraudes bancárias digitais, invasão de dispositivos, calúnia, injúria e difamação.",
            wa: "Olá, Dr. Sander! Gostaria de atendimento sobre Crimes Digitais / Contra a Honra."
          },
          {
            badge: "EXCLUSIVO • INTERNACIONAL",
            title: "Reabilitação Criminal & Parecer para Vistos (EUA/Europa)",
            desc: "Baixa de apontamentos, certidões explicativas e elaboração de parecer jurídico para requerentes de visto americano, canadense ou europeu que possuam histórico judicial.",
            wa: "Olá, Dr. Sander! Preciso de análise de antecedentes / Reabilitação Criminal para pedido de Visto."
          }
        ];

        var cardsHtml = crimServices.map(function (s) {
          return '<article class="criminal-card p-6 sm:p-7 rounded flex flex-col justify-between">' +
            '<div>' +
              '<span class="inline-block text-[10px] font-extrabold uppercase tracking-widest text-[#e6c985] bg-[#0a1226] border border-[#25365c] px-2.5 py-1 rounded mb-3">' + s.badge + '</span>' +
              '<h3 class="text-xl font-bold text-white mb-2.5">' + s.title + '</h3>' +
              '<p class="text-xs sm:text-sm text-[#a9b2c4] leading-relaxed mb-6">' + s.desc + '</p>' +
            '</div>' +
            '<a href="' + buildWaUrl(s.wa) + '" target="_blank" rel="noopener" class="w-full py-3 px-4 rounded bg-[#16274c] hover:bg-[#c9a45c] text-white hover:text-[#0a1226] font-bold text-xs flex items-center justify-between transition-colors">' +
              '<span>Solicitar Atendimento Sigiloso</span>' +
              '<span>→</span>' +
            '</a>' +
          '</article>';
        }).join("");

        container.innerHTML =
          /* Hero Criminal 24h */
          '<section class="criminal-hero-bg border-b border-[#25365c] py-14 sm:py-20">' +
            '<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">' +
              '<button onclick="switchView(\'home\')" class="text-xs font-bold uppercase tracking-wider text-[#c9a45c] hover:underline mb-4 block">← Voltar ao Portal Principal</button>' +
              '<div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">' +
                '<div class="lg:col-span-8 space-y-6">' +
                  '<div class="inline-flex items-center gap-2.5 bg-[#dc2626]/20 border border-[#dc2626] px-4 py-1.5 rounded">' +
                    '<span class="w-2.5 h-2.5 rounded-full bg-[#dc2626] pulse-live"></span>' +
                    '<span class="text-xs font-extrabold uppercase tracking-[0.2em] text-white">PLANTÃO CRIMINAL 24 HORAS • RIO DE JANEIRO & TODO O BRASIL</span>' +
                  '</div>' +
                  '<h1 class="text-3xl sm:text-5xl lg:text-[3.4rem] font-bold text-white leading-[1.1]">' +
                    'Defesa Criminal Técnica, Combativa e com <span class="gold-text">Sigilo Absoluto</span>.' +
                  '</h1>' +
                  '<p class="text-base sm:text-lg text-[#c3cadb] leading-relaxed max-w-2xl">' +
                    'Na advocacia criminal, o tempo é decisivo para preservar a liberdade e a honra. Atuamos 24 horas em <strong>prisões em flagrante, delegacias, audiências de custódia, Habeas Corpus, inquéritos policiais e ações penais de alta complexidade</strong>.' +
                  '</p>' +
                  '<div class="flex flex-col sm:flex-row gap-4 pt-2">' +
                    '<a href="' + urgentWa + '" target="_blank" rel="noopener" class="btn-urgent text-sm px-7 py-4 rounded inline-flex items-center justify-center gap-2.5">' +
                      '<span class="w-2.5 h-2.5 rounded-full bg-white pulse-live"></span>' +
                      '<span>ACIONAR PLANTÃO 24H NO WHATSAPP</span>' +
                    '</a>' +
                    '<a href="' + consultWa + '" target="_blank" rel="noopener" class="btn-gold text-sm px-7 py-4 rounded inline-flex items-center justify-center gap-2">' +
                      '<span>Agendar Consulta Criminal Sigilosa</span>' +
                      '<span>→</span>' +
                    '</a>' +
                  '</div>' +
                '</div>' +

                /* Quadro de Emergência Rápida */
                '<div class="lg:col-span-4">' +
                  '<div class="bg-[#0f1b38] border-2 border-[#c9a45c] p-6 sm:p-7 rounded shadow-2xl space-y-4">' +
                    '<div class="flex items-center justify-between border-b border-[#25365c] pb-3">' +
                      '<span class="text-xs font-extrabold uppercase tracking-wider text-[#e6c985]">Central de Urgência Penal</span>' +
                      '<span class="text-[11px] bg-[#dc2626] text-white font-bold px-2 py-0.5 rounded">24h Online</span>' +
                    '</div>' +
                    '<p class="text-xs text-[#dcd8cb] leading-relaxed">Familiar detido, intimação policial ou cumprimento de busca e apreensão? Não preste depoimento sem a presença do seu advogado.</p>' +
                    '<ul class="space-y-2 text-xs text-[#a9b2c4]">' +
                      '<li class="flex items-center gap-2"><span class="text-[#c9a45c]">✔</span> Deslocamento imediato para Delegacias (RJ)</li>' +
                      '<li class="flex items-center gap-2"><span class="text-[#c9a45c]">✔</span> Pedido urgente de Liberdade / HC</li>' +
                      '<li class="flex items-center gap-2"><span class="text-[#c9a45c]">✔</span> Atendimento direto pelo Dr. Sander Otávio</li>' +
                    '</ul>' +
                    '<a href="' + urgentWa + '" target="_blank" rel="noopener" class="w-full bg-[#25d366] hover:bg-[#20bd5a] text-[#06361b] font-extrabold text-xs sm:text-sm py-3.5 px-4 rounded block text-center">' +
                      '💬 Falar Agora com Advogado Criminalista' +
                    '</a>' +
                  '</div>' +
                '</div>' +
              '</div>' +
            '</div>' +
          '</section>' +

          /* Especialidades Criminais */
          '<section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">' +
            '<div class="flex flex-col md:flex-row md:items-end justify-between gap-4">' +
              '<div>' +
                '<p class="text-[#c9a45c] tracking-[0.22em] text-xs font-semibold uppercase mb-2">Áreas de Atuação Penal • Sander Otávio Advocacia</p>' +
                '<h2 class="text-2xl sm:text-4xl font-bold text-white">Defesa estratégica em todas as fases da persecução penal</h2>' +
              '</div>' +
              '<p class="text-xs sm:text-sm text-[#a9b2c4] max-w-md">Clique na especialidade correspondente para iniciar conversa sigilosa com o escritório pelo WhatsApp.</p>' +
            '</div>' +
            '<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">' + cardsHtml + '</div>' +

            /* Protocolo de Orientação Imediata */
            '<div class="bg-[#121f3d] border border-[#25365c] border-l-4 border-l-[#dc2626] p-7 sm:p-10 rounded space-y-6">' +
              '<h3 class="text-xl sm:text-2xl font-bold text-white">Como agir em caso de Abordagem, Condução à Delegacia ou Intimação?</h3>' +
              '<div class="grid grid-cols-1 md:grid-cols-3 gap-6">' +
                '<div class="p-4 bg-[#0a1226]/70 border border-[#25365c] rounded">' +
                  '<span class="font-serif-title text-2xl text-[#c9a45c] font-bold">01. Direito ao Silêncio</span>' +
                  '<p class="text-xs text-[#c3cadb] mt-2 leading-relaxed">A Constituição Federal garante o direito de permanecer em silêncio e de só se manifestar na presença de seu advogado constituído, sem que isso implique qualquer prejuízo.</p>' +
                '</div>' +
                '<div class="p-4 bg-[#0a1226]/70 border border-[#25365c] rounded">' +
                  '<span class="font-serif-title text-2xl text-[#c9a45c] font-bold">02. Contato Imediato</span>' +
                  '<p class="text-xs text-[#c3cadb] mt-2 leading-relaxed">Informe imediatamente a delegacia ou o número do processo/inquérito à nossa equipe para que possamos ter acesso aos autos (Súmula Vinculante 14 do STF).</p>' +
                '</div>' +
                '<div class="p-4 bg-[#0a1226]/70 border border-[#25365c] rounded">' +
                  '<span class="font-serif-title text-2xl text-[#c9a45c] font-bold">03. Preservação de Provas</span>' +
                  '<p class="text-xs text-[#c3cadb] mt-2 leading-relaxed">Reúna documentos de residência fixa, atividade lícita, conversas e testemunhas que serão essenciais na Audiência de Custódia ou na resposta à acusação.</p>' +
                '</div>' +
              '</div>' +
            '</div>' +
          '</section>';
      }

      /* --- 7.3 LANDING PAGE CÍVEL & AÇÃO REVISIONAL DE CONTRATOS (#civel) --- */
      function renderCivelLandingPage(container) {
        var area = AREAS.civel;
        var subCards = area.subs.map(function (s, idx) {
          var waMsg = buildWaUrl("Olá, Dr. Sander! Estou na página Cível & Revisional e gostaria de orientação sobre: " + s.t);
          return '<div class="so-card p-6 sm:p-7 rounded flex flex-col justify-between">' +
            '<div>' +
              '<span class="font-serif-title text-2xl text-[#c9a45c]">0' + (idx + 1) + '</span>' +
              '<h3 class="text-lg sm:text-xl font-bold text-white mt-2">' + s.t + '</h3>' +
              '<p class="text-xs sm:text-sm text-[#a9b2c4] mt-2 leading-relaxed">' + s.d + '</p>' +
            '</div>' +
            '<a href="' + waMsg + '" target="_blank" rel="noopener" class="mt-6 pt-3 border-t border-[#25365c] text-xs font-bold text-[#e6c985] hover:underline flex items-center justify-between">' +
              '<span>Falar no WhatsApp sobre este serviço</span><span>→</span>' +
            '</a>' +
          '</div>';
        }).join("");

        container.innerHTML =
          '<section class="hero-bg border-b border-[#25365c] py-12 sm:py-16">' +
            '<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">' +
              '<button onclick="switchView(\'home\')" class="text-xs font-bold uppercase tracking-wider text-[#c9a45c] hover:underline mb-3 block">← Voltar ao Início do Portal</button>' +
              '<div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">' +
                '<div class="lg:col-span-7 space-y-5">' +
                  '<span class="inline-block text-[10px] font-extrabold uppercase tracking-[0.2em] bg-[#c9a45c] text-[#0a1226] px-3 py-1 rounded">' + area.badge + '</span>' +
                  '<h1 class="text-3xl sm:text-5xl font-bold text-white leading-tight">Ação Revisional de Contratos Bancários & <span class="gold-text">Defesa Patrimonial</span></h1>' +
                  '<p class="text-sm sm:text-base text-[#c3cadb] leading-relaxed">' +
                    'Juros abusivos em financiamentos de veículos, imóveis ou empréstimos podem comprometer sua renda e seu patrimônio. Realizamos a auditoria técnica do seu contrato bancário para identificar cobranças ilegais, defender contra Busca e Apreensão e buscar a redução justa do saldo devedor.' +
                  '</p>' +
                '</div>' +

                /* Simulador / Pré-Triagem de Ação Revisional */
                '<div class="lg:col-span-5">' +
                  '<div class="bg-[#121f3d] border border-[#c9a45c] p-6 sm:p-7 rounded shadow-2xl space-y-4">' +
                    '<h2 class="text-xl font-bold text-white">Pré-Análise de Contrato Bancário</h2>' +
                    '<p class="text-xs text-[#a9b2c4]">Selecione os dados do seu contrato para encaminhar ao especialista pelo WhatsApp:</p>' +
                    '<div class="space-y-3 text-xs">' +
                      '<div>' +
                        '<label class="block text-[#e6c985] font-bold mb-1">1. Qual é o tipo de contrato?</label>' +
                        '<select id="rev-tipo" class="w-full p-3 rounded bg-[#0a1226] border border-[#25365c] text-white">' +
                          '<option value="Financiamento de Veículo (Carro/Moto/Caminhão)">Financiamento de Veículo (Carro / Moto / Caminhão)</option>' +
                          '<option value="Financiamento Imobiliário">Financiamento Imobiliário</option>' +
                          '<option value="Empréstimo Pessoal ou Consignado">Empréstimo Pessoal ou Consignado</option>' +
                          '<option value="Empréstimo Empresarial / Capital de Giro">Empréstimo Empresarial / Capital de Giro</option>' +
                          '<option value="Cartão de Crédito ou Cheque Especial">Dívida de Cartão de Crédito / Cheque Especial</option>' +
                        '</select>' +
                      '</div>' +
                      '<div>' +
                        '<label class="block text-[#e6c985] font-bold mb-1">2. Qual a situação atual?</label>' +
                        '<select id="rev-status" class="w-full p-3 rounded bg-[#0a1226] border border-[#25365c] text-white">' +
                          '<option value="Parcelas em dia, mas juros muito altos">Parcelas em dia, mas juros muito altos</option>' +
                          '<option value="Parcelas em atraso / Dificuldade de pagamento">Parcelas em atraso / Dificuldade de pagamento</option>' +
                          '<option value="Risco ou Processo de Busca e Apreensão / Execução">Risco ou Processo de Busca e Apreensão / Execução</option>' +
                        '</select>' +
                      '</div>' +
                      '<div>' +
                        '<label class="block text-[#e6c985] font-bold mb-1">3. Valor aproximado da parcela ou dívida (opcional):</label>' +
                        '<input id="rev-valor" type="text" placeholder="Ex.: Parcela de R$ 1.800" class="w-full p-3 rounded bg-[#0a1226] border border-[#25365c] text-white">' +
                      '</div>' +
                      '<button onclick="sendRevisionalSim()" class="w-full btn-gold py-3.5 px-4 rounded text-xs sm:text-sm mt-2">' +
                        'Solicitar Análise do Meu Contrato no WhatsApp →' +
                      '</button>' +
                    '</div>' +
                  '</div>' +
                '</div>' +
              '</div>' +
            '</div>' +
          '</section>' +
          '<section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-8">' +
            '<h2 class="text-2xl sm:text-3xl font-bold text-white">Todas as frentes da Editoria Cível & Revisional</h2>' +
            '<div class="grid grid-cols-1 md:grid-cols-2 gap-6">' + subCards + '</div>' +
          '</section>';
      }

      window.sendRevisionalSim = function () {
        var tipo = document.getElementById("rev-tipo").value;
        var status = document.getElementById("rev-status").value;
        var valor = document.getElementById("rev-valor").value.trim();
        var msg = "Olá, Dr. Sander! Fiz a pré-análise de AÇÃO REVISIONAL DE CONTRATO no site. Tipo: " + tipo + " | Situação: " + status + (valor ? " | Valor aprox.: " + valor : "") + ". Gostaria de avaliar meu contrato.";
        track("lead_simulador_revisional", { tipo: tipo });
        window.open(buildWaUrl(msg), "_blank", "noopener");
      };

      /* --- 7.4 LANDING PAGE BENEFÍCIOS PREVIDENCIÁRIOS (#previdenciario) --- */
      function renderPrevidenciarioLandingPage(container) {
        var area = AREAS.previdenciario;
        var subCards = area.subs.map(function (s, idx) {
          var waMsg = buildWaUrl("Olá, Dr. Sander! Estou na página de Benefícios Previdenciários e gostaria de atendimento sobre: " + s.t);
          return '<div class="so-card p-6 sm:p-7 rounded flex flex-col justify-between">' +
            '<div>' +
              '<span class="font-serif-title text-2xl text-[#c9a45c]">0' + (idx + 1) + '</span>' +
              '<h3 class="text-lg sm:text-xl font-bold text-white mt-2">' + s.t + '</h3>' +
              '<p class="text-xs sm:text-sm text-[#a9b2c4] mt-2 leading-relaxed">' + s.d + '</p>' +
            '</div>' +
            '<a href="' + waMsg + '" target="_blank" rel="noopener" class="mt-6 pt-3 border-t border-[#25365c] text-xs font-bold text-[#e6c985] hover:underline flex items-center justify-between">' +
              '<span>Consultar Especialista em INSS pelo WhatsApp</span><span>→</span>' +
            '</a>' +
          '</div>';
        }).join("");

        container.innerHTML =
          '<section class="hero-bg border-b border-[#25365c] py-12 sm:py-16">' +
            '<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">' +
              '<button onclick="switchView(\'home\')" class="text-xs font-bold uppercase tracking-wider text-[#c9a45c] hover:underline block">← Voltar ao Início do Portal</button>' +
              '<span class="inline-block text-[10px] font-extrabold uppercase tracking-[0.2em] bg-[#c9a45c] text-[#0a1226] px-3 py-1 rounded">' + area.badge + '</span>' +
              '<h1 class="text-3xl sm:text-5xl font-bold text-white max-w-4xl leading-tight">Benefícios Previdenciários (INSS) & <span class="gold-text">Previdenciário Internacional</span></h1>' +
              '<p class="text-sm sm:text-base text-[#c3cadb] max-w-3xl leading-relaxed">' + area.desc + '</p>' +
              '<div class="flex flex-wrap gap-3 pt-2">' +
                '<button onclick="openQuizFor(\'previdenciario\')" class="btn-gold text-xs sm:text-sm px-6 py-4 rounded">Fazer Triagem do Meu Benefício (1 min) →</button>' +
                '<a href="' + buildWaUrl("Olá, Dr. Sander! Gostaria de orientação sobre Benefícios Previdenciários / INSS.") + '" target="_blank" rel="noopener" class="bg-[#25d366] text-[#06361b] font-extrabold text-xs sm:text-sm px-6 py-4 rounded">💬 Falar Direto no WhatsApp</a>' +
              '</div>' +
            '</div>' +
          '</section>' +
          '<section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-8">' +
            '<div class="grid grid-cols-1 md:grid-cols-2 gap-6">' + subCards + '</div>' +
          '</section>';
      }

      /* --- 7.5 LANDING PAGE DIREITO EMPRESARIAL (#empresarial) --- */
      function renderEmpresarialLandingPage(container) {
        var area = AREAS.empresarial;
        var subCards = area.subs.map(function (s, idx) {
          var waMsg = buildWaUrl("Olá, Dr. Sander! Estou na página de Direito Empresarial e gostaria de conversar sobre: " + s.t);
          return '<div class="so-card p-6 sm:p-7 rounded flex flex-col justify-between">' +
            '<div>' +
              '<span class="font-serif-title text-2xl text-[#c9a45c]">0' + (idx + 1) + '</span>' +
              '<h3 class="text-lg sm:text-xl font-bold text-white mt-2">' + s.t + '</h3>' +
              '<p class="text-xs sm:text-sm text-[#a9b2c4] mt-2 leading-relaxed">' + s.d + '</p>' +
            '</div>' +
            '<a href="' + waMsg + '" target="_blank" rel="noopener" class="mt-6 pt-3 border-t border-[#25365c] text-xs font-bold text-[#e6c985] hover:underline flex items-center justify-between">' +
              '<span>Agendar Reunião Empresarial no WhatsApp</span><span>→</span>' +
            '</a>' +
          '</div>';
        }).join("");

        container.innerHTML =
          '<section class="hero-bg border-b border-[#25365c] py-12 sm:py-16">' +
            '<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">' +
              '<button onclick="switchView(\'home\')" class="text-xs font-bold uppercase tracking-wider text-[#c9a45c] hover:underline block">← Voltar ao Início do Portal</button>' +
              '<span class="inline-block text-[10px] font-extrabold uppercase tracking-[0.2em] bg-[#c9a45c] text-[#0a1226] px-3 py-1 rounded">' + area.badge + '</span>' +
              '<h1 class="text-3xl sm:text-5xl font-bold text-white max-w-4xl leading-tight">Direito Empresarial, Holdings & <span class="gold-text">Expansão Internacional</span></h1>' +
              '<p class="text-sm sm:text-base text-[#c3cadb] max-w-3xl leading-relaxed">' + area.desc + '</p>' +
              '<div class="flex flex-wrap gap-3 pt-2">' +
                '<button onclick="openQuizFor(\'empresarial\')" class="btn-gold text-xs sm:text-sm px-6 py-4 rounded">Iniciar Triagem Empresarial →</button>' +
              '</div>' +
            '</div>' +
          '</section>' +
          '<section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-8">' +
            '<div class="grid grid-cols-1 md:grid-cols-2 gap-6">' + subCards + '</div>' +
          '</section>';
      }

      /* ===== 8. QUIZ DE TRIAGEM EM 4 PASSOS ===== */
      var MOM = [
        "Estou pesquisando opções e quero avaliar a viabilidade",
        "Já tenho plano/documentos e quero iniciar o processo",
        "Tenho urgência, prazo próximo ou negativa anterior"
      ];
      var qStep = 0;
      var qState = { mode: "visto", country: "eua", detail: "", moment: "" };

      window.openQuizFor = function (mode, countryKey) {
        switchView("home");
        qState.mode = mode || "visto";
        if (countryKey) qState.country = countryKey;
        qStep = 1;
        track("quiz_inicio", { servico: qState.mode, destino: countryKey || "geral" });
        renderQuiz();
        setTimeout(function () {
          var el = document.getElementById("triagem");
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }, 120);
      };

      window.resetQuiz = function () {
        qStep = 0;
        renderQuiz();
      };

      window.pickQuizStep0 = function (mode, cKey) {
        qState.mode = mode;
        if (cKey) qState.country = cKey;
        qStep = 1;
        renderQuiz();
      };

      window.pickQuizStep1 = function (val) {
        qState.detail = val;
        qStep = 2;
        renderQuiz();
      };

      window.pickQuizStep2 = function (val) {
        qState.moment = val;
        qStep = 3;
        renderQuiz();
      };

      window.submitQuizWhatsApp = function () {
        var nmEl = document.getElementById("quiz-nm");
        var rgEl = document.getElementById("quiz-rg");
        var n = nmEl ? nmEl.value.trim() : "";
        if (!n) {
          if (nmEl) nmEl.focus();
          return;
        }
        var g = rgEl ? rgEl.value.trim() : "";
        var assunto = qState.mode === "visto"
          ? "Vistos e Imigração (" + COUNTRIES[qState.country].name + ")"
          : AREAS[qState.mode].title;

        var msg = "Olá, Dr. Sander! Meu nome é " + n + (g ? " (" + g + ")" : "") +
          ". Fiz a triagem no site. Assunto: " + assunto +
          " | Objetivo: " + qState.detail +
          " | Momento atual: " + qState.moment + ".";

        track("lead_quiz", { servico: qState.mode, detalhe: qState.detail });
        window.open(buildWaUrl(msg), "_blank", "noopener");
      };

      function renderQuiz() {
        var box = document.getElementById("quiz-box");
        if (!box) return;

        var pct = ((qStep + 1) / 4) * 100;
        var html = '<div class="h-1.5 w-full bg-[#25365c] rounded mb-5 overflow-hidden"><div class="h-full bg-[#c9a45c] transition-all duration-300" style="width:' + pct + '%"></div></div>' +
          '<div class="flex items-center justify-between text-[11px] uppercase tracking-widest text-[#c9a45c] font-bold mb-5">' +
            '<span>Etapa 0' + (qStep + 1) + ' de 04</span>' +
            (qStep > 0 ? '<button onclick="resetQuiz()" class="text-[#a9b2c4] hover:text-white">↺ Trocar assunto</button>' : '') +
          '</div>';

        if (qStep === 0) {
          html += '<h3 class="text-xl sm:text-2xl font-bold text-white mb-4">Para qual destino internacional ou área jurídica você busca atendimento?</h3><div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">';
          Object.keys(COUNTRIES).forEach(function (ck) {
            var c = COUNTRIES[ck];
            html += '<button onclick="pickQuizStep0(\'visto\', \'' + ck + '\')" class="text-left p-3.5 border border-[#25365c] hover:border-[#c9a45c] bg-[#0a1226]/60 hover:bg-[#c9a45c]/10 rounded text-sm font-medium text-white flex items-center justify-between">' +
              '<span>' + c.flag + ' Visto / Residência: ' + c.name + '</span><span class="text-[#c9a45c]">→</span></button>';
          });
          Object.keys(AREAS).forEach(function (ak) {
            var a = AREAS[ak];
            html += '<button onclick="pickQuizStep0(\'' + ak + '\')" class="text-left p-3.5 border border-[#25365c] hover:border-[#c9a45c] bg-[#0a1226]/60 hover:bg-[#c9a45c]/10 rounded text-sm font-medium text-white flex items-center justify-between">' +
              '<span>⚖️ ' + a.title + '</span><span class="text-[#c9a45c]">→</span></button>';
          });
          html += '</div>';
        } else if (qStep === 1) {
          var titleQ = qState.mode === "visto"
            ? "Destino: " + COUNTRIES[qState.country].name + " — Qual é o seu objetivo (Estudo, Trabalho, Investimento ou Família)?"
            : AREAS[qState.mode].q;
          var listOpts = qState.mode === "visto" ? COUNTRIES[qState.country].opts : AREAS[qState.mode].opts;
          html += '<h3 class="text-xl sm:text-2xl font-bold text-white mb-4">' + titleQ + '</h3><div class="space-y-2.5">';
          listOpts.forEach(function (o) {
            var safe = o.replace(/'/g, "\\'");
            html += '<button onclick="pickQuizStep1(\'' + safe + '\')" class="w-full text-left p-3.5 border border-[#25365c] hover:border-[#c9a45c] bg-[#0a1226]/60 hover:bg-[#c9a45c]/10 rounded text-sm font-medium text-white flex items-center justify-between">' +
              '<span>' + o + '</span><span class="text-[#c9a45c]">→</span></button>';
          });
          html += '</div>';
        } else if (qStep === 2) {
          html += '<h3 class="text-xl sm:text-2xl font-bold text-white mb-4">Em que momento você está?</h3><div class="space-y-2.5">';
          MOM.forEach(function (m) {
            var safeM = m.replace(/'/g, "\\'");
            html += '<button onclick="pickQuizStep2(\'' + safeM + '\')" class="w-full text-left p-3.5 border border-[#25365c] hover:border-[#c9a45c] bg-[#0a1226]/60 hover:bg-[#c9a45c]/10 rounded text-sm font-medium text-white flex items-center justify-between">' +
              '<span>' + m + '</span><span class="text-[#c9a45c]">→</span></button>';
          });
          html += '</div>';
        } else {
          html += '<h3 class="text-xl sm:text-2xl font-bold text-white mb-3">Para finalizar, informe seu nome para o atendimento no WhatsApp:</h3>' +
            '<div class="space-y-3">' +
              '<input id="quiz-nm" type="text" placeholder="Seu nome completo" autocomplete="name" class="w-full p-3.5 bg-[#0a1226] border border-[#25365c] focus:border-[#c9a45c] text-white text-sm rounded focus:outline-none">' +
              '<input id="quiz-rg" type="text" placeholder="Sua cidade ou bairro (ex.: Barra da Tijuca, Recreio, São Paulo, Exterior)" class="w-full p-3.5 bg-[#0a1226] border border-[#25365c] focus:border-[#c9a45c] text-white text-sm rounded focus:outline-none">' +
              '<button onclick="submitQuizWhatsApp()" class="btn-gold text-sm px-7 py-4 rounded w-full sm:w-auto mt-2">Enviar Resumo pelo WhatsApp →</button>' +
            '</div>';
        }

        box.innerHTML = html;
      }

      /* ===== 9. MENUS AUXILIARES, HASH ROUTING E CONSENTIMENTO LGPD ===== */
      window.toggleDotsMenu = function () {
        var d = document.getElementById("dots-dropdown");
        if (d) d.classList.toggle("hidden");
      };

      window.toggleMobileMenu = function () {
        var m = document.getElementById("mobile-menu");
        if (m) m.classList.toggle("hidden");
      };

      function loadGTM() {
        if (!/^GTM-/.test(CFG.gtm) || CFG.gtm === "GTM-XXXXXXXX") return;
        window.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });
        var s = document.createElement("script");
        s.async = true;
        s.src = "https://www.googletagmanager.com/gtm.js?id=" + CFG.gtm;
        document.head.appendChild(s);
      }

      function initConsent() {
        var existing = document.getElementById("lgpd-banner");
        if (existing) existing.remove();
        if (!/^GTM-[A-Z0-9]+$/.test(CFG.gtm) || CFG.gtm === "GTM-XXXXXXXX") return;
        var c = null;
        try { c = localStorage.getItem("ck"); } catch (e) {}
        if (c === "1") return loadGTM();
        if (c === "0") return;

        var b = document.createElement("div");
        b.id = "lgpd-banner";
        b.setAttribute("role", "dialog");
        b.className = "fixed left-4 right-4 bottom-4 max-w-lg bg-[#121f3d] border border-[#25365c] border-l-4 border-l-[#c9a45c] p-5 z-50 shadow-2xl text-xs text-[#f2ede1] rounded";
        b.innerHTML = '<span>Usamos cookies de medição para entender como o site é utilizado e aprimorar nosso atendimento jurídico. Você pode aceitar ou recusar conforme a LGPD.</span>' +
          '<div class="flex gap-2.5 mt-3">' +
            '<button class="ok bg-[#c9a45c] text-[#0a1226] font-bold px-4 py-2 rounded">Aceitar</button>' +
            '<button class="no border border-[#25365c] text-[#f2ede1] px-4 py-2 rounded">Recusar</button>' +
          '</div>';
        b.addEventListener("click", function (e) {
          var t = e.target;
          if (t.classList.contains("ok")) {
            try { localStorage.setItem("ck", "1"); } catch (err) {}
            loadGTM();
            b.remove();
          } else if (t.classList.contains("no")) {
            try { localStorage.setItem("ck", "0"); } catch (err) {}
            b.remove();
          }
        });
        document.body.appendChild(b);
      }

      window.resetConsent = function () {
        try { localStorage.removeItem("ck"); } catch (e) {}
        initConsent();
      };

      /* ===== 10. INICIALIZAÇÃO GERAL ===== */
      var defaultWa = buildWaUrl("Olá, Dr. Sander! Vim pelo portal Sander Otávio Advocacia & Vistos e gostaria de atendimento.");
      var waFloat = document.getElementById("wa-float");
      var waDots = document.getElementById("wa-dots-link");
      var waSobre = document.getElementById("wa-sobre-link");
      if (waFloat) {
        waFloat.href = defaultWa;
        waFloat.addEventListener("click", function () { track("clique_whatsapp"); });
      }
      if (waDots) waDots.href = defaultWa;
      if (waSobre) waSobre.href = defaultWa;

      renderHeroCarousel();
      renderAreasGrid();
      renderQuiz();
      initConsent();

      var visaModal = document.getElementById("visa-modal");
      visaModal.addEventListener("click", function (event) {
        if (event.target === visaModal) window.closeVisaModal();
      });
      document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") window.closeVisaModal();
      });

      // Suporte a link direto para campanhas (#vistos, #criminal, #civel, #previdenciario, #empresarial)
      function checkHashRoute() {
        var h = (location.hash || "").replace("#", "").toLowerCase();
        var validViews = ["vistos", "criminal", "civel", "previdenciario", "empresarial", "home"];
        if (validViews.indexOf(h) !== -1 && h !== "home") {
          switchView(h, true);
        }
      }
      window.addEventListener("hashchange", checkHashRoute);
      checkHashRoute();

      var els = document.querySelectorAll(".rv");
      if ("IntersectionObserver" in window) {
        var io = new IntersectionObserver(function (entries) {
          entries.forEach(function (e) {
            if (e.isIntersecting) {
              e.target.classList.add("in");
              io.unobserve(e.target);
            }
          });
        }, { threshold: 0.1 });
        els.forEach(function (el) { io.observe(el); });
      } else {
        els.forEach(function (el) { el.classList.add("in"); });
      }
    })();
