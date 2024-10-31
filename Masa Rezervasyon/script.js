const reservations = JSON.parse(localStorage.getItem('reservations')) || [];

// Oturma planını güncelle
function updateSeatingPlan() {
    const seatPlan = document.getElementById("seatPlan");
    seatPlan.innerHTML = "";
    const table = document.getElementById("table").value;
    const seats = table === "Toplantı Odası" ? ["Koltuk 1", "Koltuk 2", "Koltuk 3", "Koltuk 4"] : ["Koltuk 1", "Koltuk 2"];
    
    seats.forEach(seat => {
        const button = document.createElement("button");

        // Masa 2'deki Koltuk 1 kontrolü
        if (table === "Masa 2" && seat === "Koltuk 1") {
            button.className = "seat-btn reserved"; // Butonun sınıfı 'reserved' olarak ayarlanır
            button.textContent = `${seat} (Dolu)`; // Dolu mesajı
            button.disabled = true; // Tıklanamaz hale getir
        } else {
            button.className = "seat-btn";
            button.textContent = isSeatReserved(table, seat) ? `${seat} (Dolu)` : seat;
            button.onclick = () => selectSeat(seat);
        }
        
        seatPlan.appendChild(button);
    });
}

// Koltuğun dolu olup olmadığını kontrol et
function isSeatReserved(table, seat) {
    return reservations.some(reservation => reservation.table === table && reservation.seat === seat);
}

// Koltuk seç
function selectSeat(seat) {
    const selectedSeatInput = document.getElementById("selectedSeat");
    selectedSeatInput.value = seat;
    const seatButtons = document.querySelectorAll(".seat-btn");
    seatButtons.forEach(button => {
        if (button.textContent.startsWith(seat)) {
            button.classList.add("selected");
        } else {
            button.classList.remove("selected");
        }
    });
}

// Rezervasyon yap
function submitReservation() {
    const name = document.getElementById("name").value;
    const surname = document.getElementById("surname").value;
    const startDate = document.getElementById("startDate").value;
    const endDate = document.getElementById("endDate").value;
    const selectedSeat = document.getElementById("selectedSeat").value;
    const table = document.getElementById("table").value;

    if (!selectedSeat) {
        alert("Lütfen bir koltuk seçin.");
        return;
    }

    const reservation = { name, surname, startDate, endDate, seat: selectedSeat, table };
    reservations.push(reservation);
    localStorage.setItem('reservations', JSON.stringify(reservations));
    displayReservations();
    document.getElementById("reservationForm").reset();
    updateSeatingPlan();
}

// Rezervasyonları listele
function displayReservations() {
    const reservationsList = document.getElementById("reservations");
    reservationsList.innerHTML = "";
    reservations.forEach((reservation, index) => {
        const li = document.createElement("li");
        li.textContent = `${index + 1}. ${reservation.name} ${reservation.surname} - ${reservation.startDate} - ${reservation.endDate} - ${reservation.seat}`;
        reservationsList.appendChild(li);
    });
}

// Sayfa yüklendiğinde oturma planını güncelle
window.onload = () => {
    updateSeatingPlan();
    displayReservations();
};
