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

        <meta name="csrf-token" content="{{ csrf_token() }}">
        <!-- Scripts -->
        @routes
        @viteReactRefresh
        @vite(['resources/js/app.tsx','resources/css/app.css', "resources/js/Pages/{$page['component']}.tsx"])
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
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

{{-- <!DOCTYPE html>
<head>
  <title>Pusher Test</title>
  <script src="https://js.pusher.com/8.2.0/pusher.min.js"></script>
  <script>

    // Enable pusher logging - don't include this in production
    Pusher.logToConsole = true;

    var pusher = new Pusher('1b75896478dd3b514d56', {
      cluster: 'ap2'
    });

    var channel = pusher.subscribe('student-sanjal');
    channel.bind('ChatSendEvent', function(data) {
      alert(JSON.stringify(data));
    });
  </script>
</head>
<body>
  <h1>Pusher Test</h1>
  <p>
    Try publishing an event to channel <code>student-sanjal</code>
    with event name <code>ChatSendEvent</code>.
  </p>
</body> --}}
