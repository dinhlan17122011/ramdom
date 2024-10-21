let numbers = [];
let selectedNumber = null;
let limit = 0;
let numberTableBody = document.querySelector('#numberTable tbody');

// Thiết lập giới hạn
document.getElementById('setLimitButton').addEventListener('click', function() {
    limit = parseInt(document.getElementById('limitInput').value);
    if (!isNaN(limit) && limit > 0) {
        numbers = Array.from({ length: limit }, (_, i) => ({ value: i + 1, status: '' }));
        document.getElementById('randomButton').disabled = false;
        updateNumberTable();
    }
});

// Random số
function randomNumber() {
    const availableNumbers = numbers.filter(num => num.status === '');
    if (availableNumbers.length === 0) {
        document.getElementById('result').textContent = "Hết!";
        document.getElementById('ratingButtons').style.display = 'none';
        return;
    }

    const randomIndex = Math.floor(Math.random() * availableNumbers.length);
    selectedNumber = availableNumbers[randomIndex];
    document.getElementById('result').textContent = `Số : ${selectedNumber.value}`;
    document.getElementById('ratingButtons').style.display = 'block';
}

// Khi nhấn nút random
document.getElementById('randomButton').addEventListener('click', function() {
    randomNumber();
});

// Đánh giá Đúng
document.getElementById('correctButton').addEventListener('click', function() {
    if (selectedNumber) {
        selectedNumber.status = 'Đúng';
        updateNumberTable();
        randomNumber(); // Tự động random số khác sau khi đánh giá
    }
});

// Đánh giá Sai
document.getElementById('incorrectButton').addEventListener('click', function() {
    if (selectedNumber) {
        selectedNumber.status = 'Sai';
        updateNumberTable();
        randomNumber(); // Tự động random số khác sau khi đánh giá
    }
});

// Hàm để cập nhật bảng số với trạng thái hiện tại
function updateNumberTable() {
    numberTableBody.innerHTML = '';  // Xóa nội dung cũ

    numbers.forEach((numObj) => {
        const row = document.createElement('tr');
        const numberCell = document.createElement('td');
        const statusCell = document.createElement('td');

        numberCell.textContent = numObj.value;
        statusCell.textContent = numObj.status;

        // Thêm lớp CSS theo trạng thái (Đúng, Sai)
        if (numObj.status === "Đúng") {
            statusCell.classList.add('correct-status');
        } else if (numObj.status === "Sai") {
            statusCell.classList.add('incorrect-status');
        }

        row.appendChild(numberCell);
        row.appendChild(statusCell);
        numberTableBody.appendChild(row);
    });
}
