# 🎰 Corretor de Loterias

Sistema completo para visualização de resultados das Loterias da Caixa Econômica Federal.

## 🚀 Características

- ✅ **Resultados Oficiais**: Dados diretos da API da Caixa
- 🔄 **Atualização Automática**: Resultados atualizados a cada 30 minutos
- ⚡ **Antecipação**: Resultados disponíveis até 1 hora antes da divulgação oficial
- 🎨 **Interface Moderna**: Design responsivo e intuitivo
- 🎯 **Filtros Inteligentes**: Filtre por loteria específica
- 📱 **Responsivo**: Funciona perfeitamente em desktop, tablet e mobile

## 🎲 Loterias Disponíveis

- Mega-Sena 🍀
- Lotofácil ⭐
- Quina 🎯
- Lotomania 🎲
- Timemania ⚽
- Dupla Sena 🎰
- Federal 🏛️
- Dia de Sorte 🌟
- Super Sete 7️⃣
- +Milionária 💰

## 🛠️ Tecnologias Utilizadas

- **Next.js 15** - Framework React
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização
- **Axios** - Requisições HTTP
- **API da Caixa** - Dados oficiais

## 📦 Instalação

```bash
# Instalar dependências
npm install

# Executar em desenvolvimento
npm run dev

# Build para produção
npm run build

# Iniciar produção
npm start
```

## 🌐 Acesso

Após iniciar o servidor, acesse:
- **Local**: http://localhost:5060
- **Rede**: http://<seu-ip>:5060

## 🔧 Configuração

Edite o arquivo `.env.local` para personalizar:

```env
# Porta do servidor
PORT=5060

# Intervalo de atualização (minutos)
AUTO_REFRESH_INTERVAL=30

# Duração do cache (minutos)
CACHE_DURATION=30
```

## 📊 API Endpoints

### GET /api/loterias
Retorna todos os resultados das loterias

```bash
curl http://localhost:5060/api/loterias?tipo=todas
```

### GET /api/loterias?tipo={tipo}
Retorna resultado de uma loteria específica

```bash
curl http://localhost:5060/api/loterias?tipo=megasena
```

Tipos disponíveis:
- `megasena`
- `lotofacil`
- `quina`
- `lotomania`
- `timemania`
- `duplasena`
- `federal`
- `diadesorte`
- `supersete`
- `maismilionaria`

### POST /api/loterias?action=limpar-cache
Limpa o cache de resultados

```bash
curl -X POST http://localhost:5060/api/loterias?action=limpar-cache
```

## 📱 Recursos

### Atualização Automática
O sistema atualiza os resultados automaticamente a cada 30 minutos. Você pode desativar essa função desmarcando a opção "Atualização Automática" na interface.

### Atualização Manual
Clique no botão "🔄 Atualizar Resultados" no cabeçalho para forçar uma atualização imediata.

### Filtros
Use a barra de filtros para visualizar apenas a loteria de seu interesse.

### Cache Inteligente
Os resultados são armazenados em cache por 30 minutos, reduzindo o número de requisições à API da Caixa.

## 🎨 Personalização

### Cores das Loterias
As cores são definidas no arquivo `tailwind.config.ts`:

```typescript
colors: {
  'mega-sena': '#209869',
  'lotofacil': '#930089',
  // ... outras cores
}
```

### Configuração das Loterias
Edite o arquivo `types/loteria.ts` para modificar URLs, cores e configurações.

## 🐛 Solução de Problemas

### Erro ao buscar resultados
- Verifique sua conexão com a internet
- A API da Caixa pode estar temporariamente indisponível
- Aguarde alguns minutos e tente novamente

### Resultados não atualizam
- Verifique se a atualização automática está ativada
- Limpe o cache manualmente usando o endpoint da API
- Reinicie o servidor

### Erro de CORS
- Este é um problema do lado do servidor
- Use um proxy ou configure CORS adequadamente

## 📄 Licença

Este projeto é de código aberto e está disponível para uso pessoal e educacional.

## ⚠️ Aviso Legal

Os resultados apresentados são meramente informativos. Sempre confira os resultados oficiais no site da [Caixa Econômica Federal](https://loterias.caixa.gov.br).

Este projeto não tem vínculo oficial com a Caixa Econômica Federal.

## 🤝 Contribuições

Contribuições são bem-vindas! Sinta-se à vontade para:
- Reportar bugs
- Sugerir novas funcionalidades
- Melhorar a documentação
- Enviar pull requests

## 📞 Suporte

Para dúvidas e suporte, abra uma issue no repositório do projeto.

---

Desenvolvido com ❤️ para apostadores de loteria
