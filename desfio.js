// [x] Nessa etapa, você deve criar um relacionamento entre o professor e o estudante. 

// [x] Além disso, deve-se implementar filtros na listagem da tabela de professores.

// [x] Relacionamentos
// Adicione um campo teacher_id na tabela de estudantes.

// [] Em seguida, nas páginas de cadastro e edição de estudantes adicione um campo select que lista todos os professores cadastrados. 

// [] Por fim, na página de detalhe de um estudante, crie um campo que mostre o o nome do professor do aluno.

// [] Filtros
// Na página de listagem de professores, adicione um input de texto para os 
// filtros e um botão para retornar uma nova listagem com os dados filtrados.

// [] No método index do controller, faça uma verificação para checar se existem filtros passados por query params. 

// [] Se existir, crie um método findBy no model que retorna todos os professores 
// que que tiverem o nome ou a área de atuação em comum com o filtro passado (utilize o ILIKE).j