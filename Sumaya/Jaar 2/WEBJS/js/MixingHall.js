document.addEventListener('DOMContentLoaded', function () {
    const buttons = document.querySelectorAll('.tablinks');

    buttons.forEach(button => {
        button.addEventListener('click', function (e) {
            buttons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            const hallId = this.getAttribute('data-hall');
            openHall(e, hallId);
        });
    });

    document.querySelector('.tablinks[data-hall="one"]').click();

    setupAddMachineButtons(); 
});

function openHall(evt, hallId) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");

    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    tablinks = document.getElementsByClassName("tablinks");

    // Show the correct tab
    if (hallId === "one") {
        document.getElementById("one").style.display = "block";
    }
    if (hallId === "two") {
        document.getElementById("two").style.display = "block";
    }

    if (hallId === "all") {
        document.getElementById("one").style.display = "block";
        document.getElementById("two").style.display = "block";
    } else {
        const hall = document.getElementById(hallId);
        if (hall) {
            hall.style.display = "block";
        }
    }
}

function setupAddMachineButtons() {
    const addMachineButtons = document.querySelectorAll('.addMachineBtn');

    addMachineButtons.forEach(button => {
        if (!button.hasAttribute('data-listener')) {
            button.addEventListener('click', function() {
                const hall = this.getAttribute('data-hall');
                const containerId = hall === 'one' ? 'machines-one' : 'machines-two';

                const machineManager = new MachineManager(containerId);

                machineManager.addMachine(); // voeg de machine toe aan de hall

                console.log('A new machine has been created for ' + hall);
            });

            button.setAttribute('data-listener', 'true');
        }
    });
}
