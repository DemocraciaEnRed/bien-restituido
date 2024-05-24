export default `
<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Verificar cuenta</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
        integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA=="
        crossorigin="anonymous" referrerpolicy="no-referrer" />
    {{> @cssStyle}}
    <style>
        .logo {
            max-width: 300px;
            width: 100%;
            margin: 0 auto 30px;
        }
    </style>
</head>

<body>
    <section class="hero is-white is-fullheight is-bold">
        <div class="hero-body">
            <div class="container has-text-centered">
                <figure class="logo">
                    {{> @logo}}
                </figure>

                {{> @partial-block }}
            </div>
        </div>
    </section>
</body>

</html>`