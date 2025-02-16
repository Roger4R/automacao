module.exports = function(RED) {
    function AutomacaoNode(config) {
        RED.nodes.createNode(this, config);
        var node = this;

        // Definindo o valor para client_id e payload
        this.client_id = config.client_id || "N?o informado";
        this.payload = config.payload || "Mensagem do Home Automation: ";

        // Validando client_id antes de processar a mensagem
        if (!this.client_id) {
            node.error("Por favor, informe um client_id v?lido!");
            return;
        }

        // Enviando a mensagem para o pr?ximo n? com payload e client_id
        node.on('input', function(msg) {
            // Definindo o payload com base no que foi passado
            msg.payload = this.payload + msg.payload;
            msg.client_id = this.client_id; // Incluindo client_id no msg

            // Enviando a mensagem
            node.send(msg);
        });
    }

    // Registra o n? e as configura??es do n? (como inputs, outputs, etc)
    RED.nodes.registerType('automacao', AutomacaoNode, {
        category: 'function',
        color: '#a6bbcf',
        defaults: {
            name: { value: '' },
            client_id: { value: '', required: true },
            payload: { value: 'Mensagem da Automação: ', required: true }
        },
        inputs: 1,
        outputs: 1,
        icon: "font-awesome/fa-cogs",
        label: function() {
            return this.name || "Automação";
        },
        oneditprepare: function() {
            // Quando o n? for aberto para edi??o
            var clientIdField = $('<input>', {
                type: 'text',
                id: 'node-input-client_id',
                value: this.client_id || ''
            }).appendTo('#automacao-config');
        }
    });
};
