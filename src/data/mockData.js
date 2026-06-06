// src/data/mockData.js
// 抗肿瘤静脉给药知识图谱数据

// 实体类型颜色配置
export const entityColors = {
    disease: '#FF6B6B',
    drug: '#4ECDC4',
    symptom: '#FFE66D',
    department: '#95E77E',
    examination: '#DDA0DD'
}

// ==================== 左侧菜单配置（唯一数据源） ====================
export const leftMenuConfig = [
    {
        key: 'definition',
        label: '定义',
        children: [],
        content: {
            type: 'static',
            value: '通过细胞杀伤、免疫调控、内分泌调节等途径，在细胞、分子水平进行作用，达到抑制肿瘤生长或消除肿瘤的药物'
        }
    },
    {
        key: 'operation',
        label: '操作要点',
        children: [],
        content: {
            type: 'drugDetail',
            drugName: '利妥昔单抗',
            detail: {
                "再次双人核对": "",
                "遵循 WS/T 433—2023、T/CNAS 33—2023 的规定进行血管通路的建立、使用及维护。": "",
                "使用全密闭式输注系统进行抗肿瘤药物的输注。": "",
                "给药前后根据药物性质选择 0.9 %氯化钠注射液或 5 %葡萄糖注射液冲管。": "",
                "遵医嘱完成预防性用药。": "",
                "根据药品说明书、治疗方案及药物相互作用原则行给药顺序及给药间隔。": "",
                "根据医嘱、药品说明书及患者耐受情况，调节药物输注速度。": "",
                "使用中心静脉血管通路进行抗肿瘤药物给药时，应执行：": "• 回抽血液确认导管在静脉管腔内<br>• 评估导管有无脱出、移位，输液港注射座有无翻转、外露<br>• 评估穿刺区域及沿血管走向的皮肤有无疼痛、发红、肿胀、烧灼感等<br>• 推注发疱性抗肿瘤药物时，每推注 2～5 ml 药液，应评估并确认静脉回血"
            }
        }
    },
    {
        key: 'occupationalProtection',
        label: '职业防护',
        children: [],
        content: { type: 'static', value: '内容待补充' }
    },
    {
        key: 'assessment',
        label: '评估',
        children: [
            {
                key: 'doubleCheck',
                label: '双人核对',
                content: { type: 'static', value: '双人核对内容待补充' }
            },
            {
                key: 'treatmentPlan',
                label: '治疗方案',
                content: { type: 'static', value: '治疗方案内容待补充' }
            },
            {
                key: 'patientCondition',
                label: '患者病情',
                content: { type: 'static', value: '患者病情内容待补充' }
            }
        ]
    },
    {
        key: 'drugCategory',
        label: '药物分类',
        children: [
            {
                key: 'targeted',
                label: '分子靶向药物',
                children: [
                    {
                        key: 'rituximab',
                        label: '利妥昔单抗',
                        content: {
                            type: 'drugDetail',
                            drugName: '利妥昔单抗',
                            detail: {
                                "靶向": "CD20",
                                "药物性质": "单克隆抗体",
                                "溶媒": "0.9%氯化钠注射液 / 5%葡萄糖注射液",
                                "溶媒量（ml）": "/",
                                "浓度（mg/ml）": "1",
                                "输液时间（min）": "首次50mg/h，如果无输液反应，可每30min 增加50mg/h；后续100mg/h，每30min 增加100 mg/h。最大速度400mg/h",
                                "稳定性（h）": "12（室温）/ 24（2℃～8℃）",
                                "注意事项": "/"
                            }
                        }
                    },
                    { key: 'cetuximab', label: '西妥昔单抗', content: { type: 'static', value: '西妥昔单抗详细信息待补充' } },
                    { key: 'pertuzumab', label: '帕妥珠单抗', content: { type: 'static', value: '帕妥珠单抗详细信息待补充' } },
                    { key: 'trastuzumab', label: '曲妥珠单抗', content: { type: 'static', value: '曲妥珠单抗详细信息待补充' } },
                    { key: 'nimotuzumab', label: '尼妥珠单抗', content: { type: 'static', value: '尼妥珠单抗详细信息待补充' } },
                    { key: 'bevacizumab', label: '贝伐珠单抗', content: { type: 'static', value: '贝伐珠单抗详细信息待补充' } }
                ],
                content: { type: 'static', value: '...' }
            },
            {
                key: 'immunotherapy',
                label: '免疫治疗药物',
                children: [
                ],
                content: { type: 'static', value: '...' }
            },
            {
                key: 'endocrine',
                label: '内分泌治疗药物',
                children: [
                ],
                content: { type: 'static', value: '...' }
            },
            {
                key: 'chemotherapy',
                label: '化学治疗药物',
                children: [
                ],
                content: { type: 'static', value: '...' }
            }
        ]
    }
]

// ==================== 从菜单配置自动生成图谱数据 ====================

// 递归生成图谱节点和边
const generateGraphNodes = (items, parentId = null, level = 1) => {
    const nodes = []
    const edges = []

    for (const item of items) {
        // 添加当前节点
        const nodeType = level === 3 ? 'drug' : 'menu'
        nodes.push({
            id: item.key,
            name: item.label,
            type: nodeType,
            level: level
        })

        // 如果有父节点，添加边
        if (parentId) {
            edges.push({
                source: parentId,
                target: item.key,
                label: '',
                arrow: true  // 有箭头
            })
        }

        // 递归处理子节点
        if (item.children && item.children.length > 0) {
            const { nodes: childNodes, edges: childEdges } = generateGraphNodes(
                item.children,
                item.key,
                level + 1
            )
            nodes.push(...childNodes)
            edges.push(...childEdges)
        }
    }

    return { nodes, edges }
}

// 生成图谱数据
const { nodes: graphNodes, edges: graphEdges } = generateGraphNodes(leftMenuConfig)

// 获取所有一级菜单节点的key（用于添加它们之间的连接）
const level1Keys = leftMenuConfig.filter(item => !item.children || item.children.length === 0 || item.key === 'assessment' || item.key === 'drugCategory').map(item => item.key)

// 添加一级菜单之间的连接（形成链路）
const level1Edges = []
for (let i = 0; i < level1Keys.length - 1; i++) {
    level1Edges.push({
        source: level1Keys[i],
        target: level1Keys[i + 1],
        label: '',
        arrow: false  // 无箭头
    })
}

// 合并所有边
const allEdges = [...graphEdges, ...level1Edges]

export const graphData = {
    nodes: graphNodes,
    edges: allEdges
}

// ==================== 辅助函数 ====================

// 递归查找菜单项内容
export const getMenuContentByKey = (menuKey) => {
    const findContent = (items, key) => {
        for (const item of items) {
            if (item.key === key) {
                return item.content || null
            }
            if (item.children && item.children.length) {
                const found = findContent(item.children, key)
                if (found) return found
            }
        }
        return null
    }
    return findContent(leftMenuConfig, menuKey)
}

// 递归查找菜单项标题
export const findMenuTitleByKey = (menuKey) => {
    const findTitle = (items, key) => {
        for (const item of items) {
            if (item.key === key) {
                return item.label
            }
            if (item.children && item.children.length) {
                const found = findTitle(item.children, key)
                if (found) return found
            }
        }
        return null
    }
    return findTitle(leftMenuConfig, menuKey)
}