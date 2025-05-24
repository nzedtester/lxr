
    // Elementos interactivos para habilitar el audio
    const interactiveElements = [
        document.getElementById('phoneMake'),
        document.getElementById('sensitivityType'),
        document.getElementById('includeDPI'),
        document.getElementById('simpleSensitivity'),
        document.querySelector('button')
    ];

interactiveElements.forEach(element => {
    if (element) {
        // Khi người dùng nhấn chuột vào phần tử
        element.addEventListener('click', () => {
            if (audio.paused && audio.src) { // Đảm bảo audio đang tạm dừng và đã có nguồn
                audio.muted = false; // Bỏ tắt tiếng
                audio.play().catch(e => console.log("Phát âm thanh thất bại khi có tương tác:", e));
            }
        }, { once: true }); // Sự kiện chỉ được kích hoạt một lần

        // Khi người dùng focus vào phần tử (bằng phím tab, v.v.)
        element.addEventListener('focus', () => {
            if (audio.paused && audio.src) {
                audio.muted = false;
                audio.play().catch(e => console.log("Phát âm thanh thất bại khi có tương tác:", e));
            }
        }, { once: true });
    }
});


    // Event listener para el input del celular (para mostrar/ocultar DPI)
    document.getElementById('phoneMake').addEventListener('input', function() {
        const phoneMake = this.value;
        const dpiOptionGroup = document.getElementById('dpiOptionGroup');
        const simpleOptionGroup = document.getElementById('simpleOptionGroup');

        if (phoneMake.toLowerCase().includes('iphone')) {
            dpiOptionGroup.style.display = 'none';
            simpleOptionGroup.style.display = 'flex';
        } else {
            dpiOptionGroup.style.display = 'flex';
            simpleOptionGroup.style.display = 'none';
        }
    });
});

// Función global para generar la sensibilidad (llamada por el onclick del botón)
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateSensitivity() {
    const phoneMake = document.getElementById('phoneMake').value.trim();
    const sensitivityType = document.getElementById('sensitivityType').value;
    const resultsDiv = document.getElementById('sensitivityResults');
    resultsDiv.innerHTML = ''; // Limpiar resultados anteriores

    if (!phoneMake) {
        resultsDiv.innerHTML = `
            <p style="color: red; font-weight: bold;">Vui lòng nhập nhãn hiệu hoặc kiểu điện thoại di động để tạo độ nhạy.</p>
        `;
        return;
    }

    resultsDiv.innerHTML += `
        <p>Lux Config máy: <strong>${phoneMake}</strong></p>
    `;
    resultsDiv.innerHTML += `
        <p>Tipo de Sensibilidad: <strong>${sensitivityType === 'aggressive' ? 'Mượt' : sensitivityType === 'precise' ? 'Chính xác' : 'Cân bằng'}</strong></p>
    `;

    let generalSensitivity, scope2xSensitivity, fireButtonSensitivity, dpi;

    if (sensitivityType === 'aggressive') {
        generalSensitivity = getRandomNumber(150, 200);
        scope2xSensitivity = getRandomNumber(120, 200);
        fireButtonSensitivity = getRandomNumber(50, 70);
        dpi = getRandomNumber(700, 960);
    } else if (sensitivityType === 'precise') {
        generalSensitivity = getRandomNumber(100, 150);
        scope2xSensitivity = getRandomNumber(90, 130);
        fireButtonSensitivity = getRandomNumber(50, 67);
        dpi = getRandomNumber(400, 700);
    } else { // balanced
        generalSensitivity = getRandomNumber(0, 200);
        if (generalSensitivity >= 100 && generalSensitivity <= 200) {
            fireButtonSensitivity = getRandomNumber(50, 70);
        } else {
            fireButtonSensitivity = getRandomNumber(70, 86);
        }

        if (generalSensitivity > 120) {
            scope2xSensitivity = getRandomNumber(50, 119);
        } else {
            scope2xSensitivity = getRandomNumber(50, 200);
        }

        if (generalSensitivity >= 0 && generalSensitivity <= 100) {
            dpi = getRandomNumber(560, 960);
        } else if (generalSensitivity >= 150 && generalSensitivity <= 200) {
            dpi = getRandomNumber(360, 560);
        } else {
            dpi = getRandomNumber(360, 960);
        }
    }


    const sensitivities = [
        { name: "Nhìn xung quanh", value: generalSensitivity },
        { name: "Ống ngắm hồng tâm", value: sensitivityType === 'aggressive' ? getRandomNumber(150, 200) : sensitivityType === 'precise' ? getRandomNumber(50, 100) : getRandomNumber(50, 200) },
        { name: "Ống ngắm x2", value: scope2xSensitivity },
        { name: "Ống ngắm x4", value: sensitivityType === 'aggressive' ? getRandomNumber(150, 200) : sensitivityType === 'precise' ? getRandomNumber(50, 100) : getRandomNumber(50, 200) },
        { name: "Ống ngắm AWM", value: sensitivityType === 'aggressive' ? getRandomNumber(150, 200) : sensitivityType === 'precise' ? getRandomNumber(50, 100) : getRandomNumber(50, 200) },
        { name: "Camera", value: sensitivityType === 'aggressive' ? getRandomNumber(150, 200) : sensitivityType === 'precise' ? getRandomNumber(50, 100) : getRandomNumber(50, 200) },
        { name: "Kích cỡ nút bắn", value: fireButtonSensitivity }
    ];

    sensitivities.forEach(item => {
        resultsDiv.innerHTML += `
            <p>${item.name}: <strong>${item.value}</strong></p>
        `;
    });

    const includeDPIElement = document.getElementById('includeDPI');
    if (phoneMake.toLowerCase().includes('iphone')) {
        resultsDiv.innerHTML += `
            <p>Sencillo (0-120): <strong>${getRandomNumber(0, 120)}</strong></p>
        `;
    } else if (includeDPIElement && includeDPIElement.value === 'yes') {
        resultsDiv.innerHTML += `
            <p>DPI: <strong>${dpi}</strong></p>
        `;
        resultsDiv.innerHTML += `
            <p style="font-size: 0.9em; color: #666; margin-top: 10px;">
                *DPI Config Luxury chân thành cảm ơn bạn vì đã sử dụng sản phẩm chúng tôi.
            </p>
        `;
    }
}
