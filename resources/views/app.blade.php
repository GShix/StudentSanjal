<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="icon" href="/img/icon.png" type="image/x-icon">

        <title inertia>{{ config('app.name','StudentSanjal') }}</title>

        <link href="https://cdn.jsdelivr.net/npm/remixicon@4.3.0/fonts/remixicon.css" rel="stylesheet" />
        <link rel="stylesheet" href="https://demos.creative-tim.com/notus-js/assets/styles/tailwind.css" />
        <link rel="stylesheet" href="https://demos.creative-tim.com/notus-js/assets/vendor/@fortawesome/fontawesome-free/css/all.min.css">

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

        <!-- Scripts -->
        @routes
        @viteReactRefresh
        @vite(['resources/js/app.tsx', "resources/js/Pages/{$page['component']}.tsx"])
        @inertiaHead
    </head>
    <body class="font-sans antialiased m-0 p-0">
        @inertia

        <script>
            function filterFAQs() {
                const input = document.getElementById('searchInput');
                const filter = input.value.toLowerCase();
                const faqs = document.querySelectorAll('#faqList > li');

                faqs.forEach(faq => {
                    const questionElement = faq.querySelector('.question');
                    const answerElement = faq.querySelector('.answer');
                    const question = questionElement.textContent.toLowerCase();
                    const answer = answerElement.textContent.toLowerCase();

                    if (question.includes(filter) || answer.includes(filter)) {
                        faq.style.display = '';
                        highlightText(questionElement, filter);
                        highlightText(answerElement, filter);
                    } else {
                        faq.style.display = 'none';
                    }
                });
            }

            function highlightText(element, filter) {
                const text = element.textContent;
                const regex = new RegExp(`(${filter})`, 'gi');
                const highlightedText = text.replace(regex, '<span class="highlight">$1</span>');
                element.innerHTML = highlightedText;
            }

            function toggleFAQ(button) {
                const answerDiv = button.nextElementSibling;
                answerDiv.classList.toggle('hidden');
            }
        </script>
    </body>
</html>
