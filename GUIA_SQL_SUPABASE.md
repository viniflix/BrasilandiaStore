# 📌 GUIA RÁPIDO - EXECUTAR SQL NO SUPABASE

## ⚠️ IMPORTANTE
Sem executar este SQL, a plataforma **NÃO funcionará completamente**. As páginas de regras, configurações e outros recursos dependerão dele.

---

## 🔧 PASSO A PASSO

### 1. Abra o Supabase Dashboard
- Acesse: https://app.supabase.com
- Selecione seu projeto **BrasiLândia Store**

### 2. Vá para SQL Editor
```
Supabase Dashboard 
  → SQL Editor (aba esquerda)
  → Clique em "New Query"
```

### 3. Cole o SQL Completo
Abra o arquivo `supabase-new-tables.sql` na raiz do projeto:
- Copie **TODO** o conteúdo
- Cole no SQL Editor do Supabase
- Clique em **"Run"** (ou Ctrl+Enter)

### 4. Aguarde Conclusão
Você verá uma mensagem: `Query executed successfully`

✅ **Pronto!** As tabelas foram criadas com sucesso.

---

## 📋 O QUE O SQL CRIA

### Tabelas Novas
- `server_config` - Configurações do servidor (logo, IP, descrição, etc)
- `server_rules` - Regras do servidor com punições

### Colunas Novas
- `products.sales_count` - Rastreamento de vendas por produto

### Índices
- `idx_server_rules_active` - Performance em filtro de regras ativas
- `idx_products_sales` - Performance em top vendidos

### Dados Iniciais
- 1 configuração padrão
- 4 regras de exemplo (Anti-hack, Respeito, Spam, Griefing)

### Segurança RLS
- Público pode ler config e regras
- Apenas admin pode atualizar/criar/deletar

---

## 🧪 TESTAR APÓS EXECUTAR

Após executar o SQL, teste:

### 1. Homepage
```
http://localhost:3000/
```
Você verá:
- ✅ Hero com nome do servidor
- ✅ Logo do servidor
- ✅ IP copiável
- ✅ Top 4 produtos mais vendidos
- ✅ Widgets

### 2. Página Loja
```
http://localhost:3000/loja
```
- ✅ Vitrine completa
- ✅ Click em produto = Modal
- ✅ Adicionar ao carrinho

### 3. Página Regras
```
http://localhost:3000/regras
```
- ✅ 4 regras de exemplo
- ✅ Punições em destaque
- ✅ Botões "Comprar Desban"

### 4. Admin - Configurações
```
http://localhost:3000/admin/settings
```
- ✅ Configurar nome, logo, IP, versão
- ✅ Salvar automaticamente

### 5. Admin - Gerenciar Regras
```
http://localhost:3000/admin/rules
```
- ✅ Listar regras
- ✅ Criar nova regra
- ✅ Editar regra existente
- ✅ Deletar regra

---

## ❓ TROUBLESHOOTING

### Erro: "Permission denied"
- Certifique-se de que você é **admin** no sistema
- Verifique a `admin_whitelist` table

### Erro: "Column already exists"
- É normal! O `IF NOT EXISTS` evita re-criar
- Execute novamente sem problema

### Regras não aparecem na `/regras`
- Verificar se `active = TRUE` na tabela
- Recarregar página (F5)

### Config não salva
- Verificar se RLS Policy está ativa
- Verificar email de admin em `admin_whitelist`

---

## 💾 ARQUIVO SQL

Localização: `supabase-new-tables.sql` (raiz do projeto)

Conteúdo: ~120 linhas com:
- CREATE TABLE x 2
- ALTER TABLE x 1
- CREATE INDEX x 2
- INSERT INTO x 5
- CREATE POLICY x 4

---

## ✅ APÓS EXECUTAR

1. Página home carrega config do servidor
2. Página /regras lista regras de verdade
3. Admin consegue editar tudo
4. Público vê apenas o que deve

---

**Status:** Pronto para executar ✅
