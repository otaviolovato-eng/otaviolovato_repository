// Dados simulados da Copa do Mundo
const RODADA_ATUAL = "Fase de Grupos - 2ª Rodada";

const jogos = [
    {
        id: 1,
        time1: "Brasil", bandeira1: "🇧🇷", gols1: 2,
        time2: "Suíça", bandeira2: "🇨🇭", gols2: 0,
        data: "15/06/2026", hora: "16:00", status: "Encerrado"
    },
    {
        id: 2,
        time1: "Camarões", bandeira1: "🇨🇲", gols1: null,
        time2: "Sérvia", bandeira2: "🇷🇸", gols2: null,
        data: "16/06/2026", hora: "13:00", status: "A jogar"
    },
    {
        id: 3,
        time1: "Brasil", bandeira1: "🇧🇷", gols1: null,
        time2: "Camarões", bandeira2: "🇨🇲", gols2: null,
        data: "19/06/2026", hora: "16:00", status: "A jogar"
    }
];

const classificacao = [
    { time: "Brasil", bandeira: "🇧🇷", pts: 6, j: 2, v: 2, e: 0, d: 0, gp: 4, gc: 0 },
    { time: "Suíça", bandeira: "🇨🇭", pts: 3, j: 2, v: 1, e: 0, d: 1, gp: 1, gc: 2 },
    { time: "Sérvia", bandeira: "🇷🇸", pts: 0, j: 1, v: 0, e: 0, d: 1, gp: 0, gc: 2 },
    { time: "Camarões", bandeira: "🇨🇲", pts: 0, j: 1, v: 0, e: 0, d: 1, gp: 0, gc: 1 }
];

// Função para calcular Saldo de Gols (SG)
function calcularSG(gp, gc) {
    return gp - gc;
}

// Inicialização
document.addEventListener("DOMContentLoaded", () => {
    
    // Atualizar título da rodada
    document.getElementById("rodada-atual").textContent = `Rodada Atual: ${RODADA_ATUAL}`;

    // Renderizar Jogos
    const listaJogos = document.getElementById("lista-jogos");
    jogos.forEach(jogo => {
        const placar1 = jogo.gols1 !== null ? jogo.gols1 : '-';
        const placar2 = jogo.gols2 !== null ? jogo.gols2 : '-';
        const statusClass = jogo.status === "Encerrado" ? "color: red;" : "color: green;";

        const card = document.createElement("div");
        card.className = "card-jogo";
        card.innerHTML = `
            <div class="data-hora">${jogo.data} às ${jogo.hora} <br> <span style="${statusClass}">${jogo.status}</span></div>
            <div class="placar">
                <div class="time">
                    <span class="bandeira">${jogo.bandeira1}</span>
                    <span>${jogo.time1}</span>
                </div>
                <div>${placar1} x ${placar2}</div>
                <div class="time">
                    <span class="bandeira">${jogo.bandeira2}</span>
                    <span>${jogo.time2}</span>
                </div>
            </div>
        `;
        listaJogos.appendChild(card);
    });

    // Renderizar Tabela de Classificação
    const tabelaCorpo = document.getElementById("tabela-corpo");
    
    // Ordenar tabela por Pontos (Pts) e depois Saldo de Gols (SG)
    const classificadosOrdenados = classificacao.sort((a, b) => {
        if (b.pts !== a.pts) return b.pts - a.pts;
        return calcularSG(b.gp, b.gc) - calcularSG(a.gp, a.gc);
    });

    classificadosOrdenados.forEach((time, index) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td><strong>${index + 1}º</strong></td>
            <td style="text-align: left;">${time.bandeira} ${time.time}</td>
            <td><strong>${time.pts}</strong></td>
            <td>${time.j}</td>
            <td>${time.v}</td>
            <td>${time.e}</td>
            <td>${time.d}</td>
            <td>${calcularSG(time.gp, time.gc)}</td>
        `;
        tabelaCorpo.appendChild(tr);
    });
});
