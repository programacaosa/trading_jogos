// script.js

// Função para carregar os dados da Betfair
function loadBetfairData() {
    const dateInput = document.getElementById("date-input").value;
    const betfairUrl = `https://github.com/futpythontrader/YouTube/raw/main/Jogos_do_Dia/Betfair/Jogos_do_Dia_Betfair_Back_Lay_${dateInput}.csv`;
    
    Papa.parse(betfairUrl, {
        download: true,
        header: true,
        complete: function(results) {
            const betfairData = results.data;
            processBetfairData(betfairData);
        }
    });
}

// Função para processar os dados da Betfair
function processBetfairData(data) {
    // Adaptar aqui as operações que você fez com pandas no Python
    // Por exemplo, renomear colunas, filtrar ligas, etc.

    const filteredData = data.map(row => {
        return {
            Date: row['Date'],
            Time: row['Time'],
            League: row['League'],
            Home: row['Home'],
            Away: row['Away'],
            Odd_H: row['Odd_H_Back'],
            Odd_D: row['Odd_D_Back'],
            Odd_A: row['Odd_A_Back'],
            Odd_Over25: row['Odd_Over25_FT_Back'],
            Odd_BTTS_Yes: row['Odd_BTTS_Yes_Back']
        };
    });

    displayData(filteredData);
}

// Função para exibir os dados na interface do usuário
function displayData(data) {
    const container = document.getElementById("data-container");
    container.innerHTML = ""; // Limpa o conteúdo anterior

    const table = document.createElement("table");

    // Cabeçalho da tabela
    const header = table.createTHead();
    const headerRow = header.insertRow(0);
    const columns = ["Date", "Time", "League", "Home", "Away", "Odd_H", "Odd_D", "Odd_A", "Odd_Over25", "Odd_BTTS_Yes"];
    columns.forEach(col => {
        const cell = headerRow.insertCell();
        cell.innerText = col;
    });

    // Corpo da tabela
    const tbody = table.createTBody();
    data.forEach(row => {
        const rowElement = tbody.insertRow();
        columns.forEach(col => {
            const cell = rowElement.insertCell();
            cell.innerText = row[col];
        });
    });

    container.appendChild(table);

    // Exibe o botão de download
    document.getElementById("download-button").style.display = "block";
}

// Função para baixar os dados como um arquivo Excel
function downloadExcel() {
    // Implementação do download em formato Excel
    // Você pode usar bibliotecas como SheetJS (xlsx) para gerar o arquivo
}

document.getElementById("download-button").addEventListener("click", downloadExcel);
