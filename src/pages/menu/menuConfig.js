const menuConfig = [
    {
        label: 'Vistoria automóvel',
        url: '/automovel',
        role: 'INSURED',
        licence: ['AUTO']
    },
    {
        label: 'Vistoria residencial',
        url: '/residencial',
        role: 'INSURED',
        licence: ['RESIDENCIAL']
    },
    {
        label: 'Vistorias',
        url: '/vistorias',
        role: 'ADMIN',
        licence: ['AUTO', 'RESIDENCIAL']
    },
    {
        label: 'Cadastrar segurado',
        url: '/segurado',
        role: 'ADMIN',
        licence: ['AUTO', 'RESIDENCIAL']
    },
]

export default menuConfig;