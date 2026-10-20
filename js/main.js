/* -----------------------------------------------
   AlphaTrading Core Scripts (main.js)
----------------------------------------------- */

document.addEventListener("DOMContentLoaded", function () {
    
    // ==========================================
    // 1. ระบบสไลด์ภาพแบนเนอร์เปลี่ยนอัตโนมัติ (Auto Carousel)
    // ==========================================
    let currentSlide = 0;
    const slides = document.querySelectorAll('.carousel-item');
    
    if (slides.length > 0) {
        function showSlide(index) {
            slides.forEach(slide => {
                slide.classList.remove('active', 'fade-in');
            });
            slides[index].classList.add('active', 'fade-in');
        }
        
        function nextSlide() {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }
        
        // รันสไลด์อัตโนมัติทุกๆ 5 วินาที (5000 มิลลิวินาที)
        setInterval(nextSlide, 5000);
    }

    // ==========================================
    // 2. ระบบจำลองส่งความคิดเห็น (Comment Submission)
    // ==========================================
    const commentForm = document.getElementById('commentForm');
    const commenterName = document.getElementById('commenterName');
    const commentText = document.getElementById('commentText');
    const commentsList = document.getElementById('commentsList');
    const commentCountEl = document.getElementById('comment-count');
    
    // ค่าเริ่มต้นของคอมเมนต์เดิมที่มีอยู่บนหน้าเว็บ
    let currentCount = 1;

    if (commentForm) {
        commentForm.addEventListener('submit', function (e) {
            e.preventDefault();
            
            const nameValue = commenterName.value.trim();
            const textValue = commentText.value.trim();
            
            if (nameValue === "" || textValue === "") return;

            // สร้าง Element กล่องคอมเมนต์ใหม่
            const newComment = document.createElement('div');
            newComment.className = 'bg-amber-50/60 p-4 rounded-xl border border-amber-100 text-sm fade-in mb-3';
            newComment.innerHTML = `
                <div class="flex justify-between items-center mb-2">
                    <span class="font-bold text-slate-900">
                        <i class="fa-regular fa-user mr-1 text-amber-600"></i> ${escapeHTML(nameValue)}
                    </span>
                    <span class="text-xs text-gray-400">เมื่อสักครู่</span>
                </div>
                <p class="text-gray-700">${escapeHTML(textValue)}</p>
            `;
            
            // นำคอมเมนต์ใหม่ไปแปะไว้บนสุดของรายการ
            if (commentsList) {
                commentsList.insertBefore(newComment, commentsList.firstChild);
            }
            
            // อัปเดตตัวเลขแสดงจำนวนคอมเมนต์รวม
            currentCount++;
            if (commentCountEl) {
                commentCountEl.textContent = currentCount;
            }
            
            // ล้างข้อมูลในช่องกรอกหลังกดส่งเรียบร้อย
            commentText.value = '';
            commenterName.value = '';
        });
    }

    // ฟังก์ชันความปลอดภัยดักจับและกรองรหัสพิเศษ (XSS Protection)
    function escapeHTML(str) {
        return str.replace(/[&<>'"]/g, 
            tag => ({
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                "'": '&#39;',
                '"': '&quot;'
            }[tag] || tag)
        );
    }

});

