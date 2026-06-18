document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Smooth Scrolling for Nav Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
                // Close mobile menu if open
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                }
            }
        });
    });

    // Resume Tab Switching
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons and panes
            tabBtns.forEach(b => b.classList.remove('active'));
            tabPanes.forEach(p => p.classList.remove('active'));

            // Add active class to clicked button
            btn.classList.add('active');

            // Show corresponding pane
            const targetId = btn.getAttribute('data-target');
            const targetPane = document.getElementById(targetId);
            if (targetPane) {
                targetPane.classList.add('active');
            }
        });
    });

    // Drag and Drop Upload UI Mockup
    const dropZone = document.getElementById('drop-zone');
    const fileUpload = document.getElementById('file-upload');
    const fileInfo = document.getElementById('file-info');

    if (dropZone && fileUpload && fileInfo) {
        // Highlight drop zone on drag
        ['dragenter', 'dragover'].forEach(eventName => {
            dropZone.addEventListener(eventName, (e) => {
                e.preventDefault();
                e.stopPropagation();
                dropZone.classList.add('dragover');
            });
        });

        // Unhighlight drop zone
        ['dragleave', 'drop'].forEach(eventName => {
            dropZone.addEventListener(eventName, (e) => {
                e.preventDefault();
                e.stopPropagation();
                dropZone.classList.remove('dragover');
            });
        });

        // Handle drop
        dropZone.addEventListener('drop', (e) => {
            const files = e.dataTransfer.files;
            handleFiles(files);
        });

        // Handle file selection via input
        fileUpload.addEventListener('change', function() {
            handleFiles(this.files);
        });

        function handleFiles(files) {
            if (files.length > 0) {
                const file = files[0];
                fileInfo.innerHTML = `<strong>Selected File:</strong> ${file.name} (${(file.size / 1024 / 1024).toFixed(2)} MB)`;
                fileInfo.style.color = '#10b981'; // Green color for success
                
                // Mock upload process
                setTimeout(() => {
                    fileInfo.innerHTML += '<br><em>Simulating upload... Done! (This is a visual demo)</em>';
                }, 1000);
            }
        }
    }

    // Add scroll animation observer for sections
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.section').forEach(section => {
        if (section.id !== 'home') {
            section.style.opacity = '0';
            section.style.transform = 'translateY(30px)';
            section.style.transition = 'all 0.6s ease-out';
            observer.observe(section);
        }
    });

    // Custom Cursor Follower Logic
    const cursorFollower = document.createElement('div');
    cursorFollower.classList.add('cursor-follower');
    document.body.appendChild(cursorFollower);

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let cursorX = mouseX;
    let cursorY = mouseY;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Animate cursor for smooth trailing
    function animateCursor() {
        // Linear interpolation for smooth tracking
        cursorX += (mouseX - cursorX) * 0.2;
        cursorY += (mouseY - cursorY) * 0.2;
        cursorFollower.style.left = cursorX + 'px';
        cursorFollower.style.top = cursorY + 'px';
        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Add hover effects for interactive elements
    const interactives = document.querySelectorAll('a, button, .btn');
    interactives.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorFollower.classList.add('hovering');
        });
        el.addEventListener('mouseleave', () => {
            cursorFollower.classList.remove('hovering');
        });
    });
});
