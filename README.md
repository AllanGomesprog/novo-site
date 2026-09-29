# Vértice Contabilidade

Landing page responsiva em português. Marca provisória autorizada, com apresentação de serviços, segmentos interativos, etapas da parceria, perguntas frequentes e formulário demonstrativo.

A identidade usa azul claro nos detalhes e na marca, azul-marinho nos botões e textos, branco e fundos azulados suaves. Tons de azul com mais contraste são usados em textos e controles sobre fundo branco.

## Usar e personalizar

O site completo está em `dist/`. Abra `dist/index.html` em um navegador ou hospede o conteúdo dessa pasta em um servidor estático. A publicação via Sites está vinculada a `.openai/hosting.json`.

- `dist/index.html`: textos, seções, metadados e formulário.
- `dist/styles.css`: cores, identidade visual e adaptação a dispositivos.
- `dist/app.js`: menu, segmentos, seleção de serviços, formulário e privacidade.
- `dist/assets/office.jpg`: fotografia da abertura.

Antes de divulgar como escritório real, substituir a marca provisória, revisar o escopo de serviços com o responsável e adicionar dados reais de contato e identificação do escritório. Não foram inventados números de registro, clientes, avaliações, resultados ou tempo de atuação.

O formulário valida os campos, prepara um texto e permite copiá-lo. Não transmite dados nem simula confirmação de envio. Para captar contatos, integrar um destino real de e-mail, WhatsApp ou CRM, revisar a política de privacidade e substituir os avisos da demonstração. Nenhum dado do formulário é persistido.

## Ativar o WhatsApp

O botão flutuante aparece no canto inferior direito. A pedido do responsável, ele foi preparado sem número: mostra um aviso de canal indisponível e oferece acesso ao formulário, sem abrir conversas ou transmitir dados.

Quando houver um número, preencha `whatsappNumber` em `dist/site-config.js` com código do país, DDD e número. O campo aceita de 8 a 15 dígitos no formato internacional; espaços, parênteses, sinal de mais e hífens são normalizados. O valor vazio ou um formato inválido mantém o aviso de indisponibilidade. Ajuste também `whatsappMessage` se desejar. Depois, republique o site.

Com o número configurado, o mesmo botão abrirá uma conversa em nova aba, com a mensagem preenchida para o visitante revisar e enviar. Não há envio automático. O link segue a [documentação oficial do WhatsApp](https://faq.whatsapp.com/5913398998672934/?locale=pt_BR).

## Referências e créditos

A organização em soluções, setores e contato foi orientada por referências institucionais como a [Grant Thornton Brasil](https://www.grantthornton.com.br/). A identidade visual e os textos foram criados para esta página.

Fotografia de [Masood Aslami no Unsplash](https://unsplash.com/photos/a-very-tall-building-with-lots-of-windows-zLmYb7HdQwI), sob a [licença Unsplash](https://unsplash.com/license). A imagem é ilustrativa e não representa uma sede real da marca.

Tipografia Manrope, carregada pelo Google Fonts, com Arial como alternativa.
