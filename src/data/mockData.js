// 实体类型颜色映射
export const entityColors = {
    disease: '#FF6B6B',
    drug: '#4ECDC4',
    symptom: '#FFE66D',
    department: '#95E77E'
}

// 图谱数据
export const graphData = {
    nodes: [
        { id: 'd1', name: '高血压', type: 'disease' },
        { id: 'drug1', name: '硝苯地平', type: 'drug' },
        { id: 's1', name: '头痛', type: 'symptom' }
    ],
    edges: [
        { source: 'd1', target: 'drug1', label: '常用药物' },
        { source: 'd1', target: 's1', label: '常见症状' }
    ]
}

// 获取所有实体
export const getAllEntities = () => {
    return {
        diseases: graphData.nodes.filter(n => n.type === 'disease'),
        drugs: graphData.nodes.filter(n => n.type === 'drug'),
        symptoms: graphData.nodes.filter(n => n.type === 'symptom')
    }
}

// 获取实体详情
export const getEntityDetail = (entityId) => {
    const node = graphData.nodes.find(n => n.id === entityId)
    return node?.detail || {}
}