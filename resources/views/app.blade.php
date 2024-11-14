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

          <!-- Google Font: Source Sans Pro -->
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700&display=fallback">
        <!-- Font Awesome -->
        <link rel="stylesheet" href="{{ asset('/adminlte/plugins/fontawesome-free/css/all.min.css')}}">
        <!-- Ionicons -->
        {{-- <link rel="stylesheet" href="https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css"> --}}
        <!-- Tempusdominus Bootstrap 4 -->
        <link rel="stylesheet" href="{{ asset('/adminlte/plugins/tempusdominus-bootstrap-4/css/tempusdominus-bootstrap-4.min.css')}}">
        <!-- iCheck -->
        <link rel="stylesheet" href="{{ asset('/adminlte/plugins/icheck-bootstrap/icheck-bootstrap.min.css')}}">
        <!-- JQVMap -->
        <link rel="stylesheet" href="{{ asset('/adminlte/plugins/jqvmap/jqvmap.min.css')}}">
        <!-- Theme style -->
        {{-- <link rel="stylesheet" href="{{asset('/adminlte/dist/css/adminlte.min.css')}}"> --}}
        <!-- overlayScrollbars -->
        <link rel="stylesheet" href="{{ asset('/adminlte/plugins/overlayScrollbars/css/OverlayScrollbars.min.css')}}">
        <!-- Daterange picker -->
        <link rel="stylesheet" href="{{ asset('/adminlte/plugins/daterangepicker/daterangepicker.css')}}">
        <!-- summernote -->
        <link rel="stylesheet" href="{{ asset('/adminlte/plugins/summernote/summernote-bs4.min.css')}}">
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
        <script src="{{ asset('/adminlte/plugins/jquery/jquery.min.js')}}"></script>
        <!-- jQuery UI 1.11.4 -->
        <script src="{{ asset('/adminlte/plugins/jquery-ui/jquery-ui.min.js')}}"></script>
        <!-- Resolve conflict in jQuery UI tooltip with Bootstrap tooltip -->
        <script>
          $.widget.bridge('uibutton', $.ui.button)
        </script>
        <!-- Bootstrap 4 -->
        <script src="{{ asset('/adminlte/plugins/bootstrap/js/bootstrap.bundle.min.js')}}"></script>
        <!-- ChartJS -->
        <script src="{{ asset('/adminlte/plugins/chart.js/Chart.min.js')}}"></script>
        <!-- Sparkline -->
        <script src="{{ asset('/adminlte/plugins/sparklines/sparkline.js')}}"></script>
        <!-- JQVMap -->
        <script src="{{ asset('/adminlte/plugins/jqvmap/jquery.vmap.min.js')}}"></script>
        <script src="{{ asset('/adminlte/plugins/jqvmap/maps/jquery.vmap.usa.js')}}"></script>
        <!-- jQuery Knob Chart -->
        <script src="{{ asset('/adminlte/plugins/jquery-knob/jquery.knob.min.js')}}"></script>
        <!-- daterangepicker -->
        <script src="{{ asset('/adminlte/plugins/moment/moment.min.js')}}"></script>
        <script src="{{ asset('/adminlte/plugins/daterangepicker/daterangepicker.js')}}"></script>
        <!-- Tempusdominus Bootstrap 4 -->
        <script src="{{ asset('/adminlte/plugins/tempusdominus-bootstrap-4/js/tempusdominus-bootstrap-4.min.js')}}"></script>
        <!-- Summernote -->
        <script src="{{ asset('/adminlte/plugins/summernote/summernote-bs4.min.js')}}"></script>
        <!-- overlayScrollbars -->
        <script src="{{ asset('/adminlte/plugins/overlayScrollbars/js/jquery.overlayScrollbars.min.js')}}"></script>
        <!-- AdminLTE App -->
        <script src="{{ asset('/adminlte/dist/js/adminlte.js') }}"></script>
        {{-- <!-- AdminLTE for demo purposes -->
        <script src="dist/js/demo.js"></script>
        <!-- AdminLTE dashboard demo (This is only for demo purposes) -->
        <script src="dist/js/pages/dashboard.js"></script> --}}
    </body>
</html>
