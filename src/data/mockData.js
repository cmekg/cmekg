// src/data/mockData.js
// 完整医学知识图谱数据 - 基于公开医学知识整理

// 实体类型颜色配置
export const entityColors = {
    disease: '#FF6B6B',   // 疾病 - 红色
    drug: '#4ECDC4',      // 药物 - 青色
    symptom: '#FFE66D',   // 症状 - 黄色
    department: '#95E77E', // 科室 - 绿色
    examination: '#DDA0DD' // 检查 - 紫色
}

// ==================== 1. 疾病数据 ====================
const diseases = [
    { id: 'dis_001', name: '高血压', type: 'disease',
        detail: {
            英文名称: 'Hypertension',
            ICD10: 'I10',
            发病部位: '动脉系统',
            所属科室: '心血管内科',
            临床症状: ['头痛', '头晕', '心悸', '耳鸣'],
            治疗方案: ['药物治疗', '生活方式干预', '定期监测'],
            常用药物: ['硝苯地平', '卡托普利', '氢氯噻嗪'],
            并发症: ['冠心病', '脑卒中', '心力衰竭', '肾功能损害'],
            高危因素: ['高盐饮食', '肥胖', '遗传因素', '缺乏运动', '吸烟饮酒'],
            实验室检查: ['血常规', '尿常规', '肾功能', '血脂血糖'],
            影像学检查: ['心脏超声', '颈动脉超声'],
            预防措施: ['低盐饮食', '控制体重', '规律运动', '戒烟限酒']
        }
    },
    { id: 'dis_002', name: '2型糖尿病', type: 'disease',
        detail: {
            英文名称: 'Type 2 Diabetes Mellitus',
            ICD10: 'E11',
            发病部位: '胰腺',
            所属科室: '内分泌科',
            临床症状: ['多饮', '多尿', '多食', '体重下降', '乏力'],
            治疗方案: ['口服降糖药', '胰岛素治疗', '饮食控制', '运动疗法'],
            常用药物: ['二甲双胍', '格列美脲', '胰岛素', '阿卡波糖'],
            并发症: ['糖尿病肾病', '视网膜病变', '糖尿病足', '神经病变'],
            高危因素: ['肥胖', '家族史', '缺乏运动', '高龄', '妊娠糖尿病史'],
            实验室检查: ['空腹血糖', '糖化血红蛋白', '口服葡萄糖耐量试验'],
            预防措施: ['控制饮食', '规律运动', '定期血糖监测']
        }
    },
    { id: 'dis_003', name: '冠心病', type: 'disease',
        detail: {
            英文名称: 'Coronary Heart Disease',
            ICD10: 'I25',
            发病部位: '冠状动脉',
            所属科室: '心血管内科',
            临床症状: ['胸痛', '胸闷', '心悸', '呼吸困难', '放射痛'],
            治疗方案: ['药物治疗', '介入治疗(支架)', '冠状动脉搭桥术'],
            常用药物: ['阿司匹林', '他汀类', '硝酸甘油', '氯吡格雷'],
            并发症: ['心肌梗死', '心力衰竭', '心律失常', '心源性休克'],
            高危因素: ['高血压', '高血脂', '糖尿病', '吸烟', '肥胖'],
            实验室检查: ['心肌酶', '血脂', '高敏C反应蛋白'],
            影像学检查: ['冠脉CTA', '冠脉造影', '心脏超声'],
            预防措施: ['控制血压血脂', '戒烟', '健康饮食', '规律运动']
        }
    },
    { id: 'dis_004', name: '肺炎', type: 'disease',
        detail: {
            英文名称: 'Pneumonia',
            ICD10: 'J18',
            发病部位: '肺部',
            所属科室: '呼吸内科',
            临床症状: ['咳嗽', '发热', '咳痰', '胸痛', '呼吸困难'],
            治疗方案: ['抗生素治疗', '对症支持治疗', '氧疗'],
            常用药物: ['阿莫西林', '头孢呋辛', '阿奇霉素', '左氧氟沙星'],
            并发症: ['胸腔积液', '脓毒症', '呼吸衰竭', '肺脓肿'],
            高危因素: ['老年人', '免疫力低下', '吸烟', '慢性肺病'],
            影像学检查: ['胸部X线', '胸部CT'],
            预防措施: ['接种疫苗', '增强免疫力', '戒烟']
        }
    },
    { id: 'dis_005', name: '慢性胃炎', type: 'disease',
        detail: {
            英文名称: 'Chronic Gastritis',
            ICD10: 'K29',
            发病部位: '胃黏膜',
            所属科室: '消化内科',
            临床症状: ['上腹痛', '腹胀', '反酸', '嗳气', '恶心'],
            治疗方案: ['抑酸治疗', '根除幽门螺杆菌', '胃黏膜保护剂', '饮食调理'],
            常用药物: ['奥美拉唑', '雷贝拉唑', '阿莫西林', '克拉霉素', '枸橼酸铋钾'],
            并发症: ['胃溃疡', '胃出血', '胃癌风险增加', '贫血'],
            高危因素: ['幽门螺杆菌感染', '不良饮食习惯', '长期饮酒', '吸烟'],
            辅助检查: ['胃镜', '幽门螺杆菌检测'],
            预防措施: ['规律饮食', '戒烟限酒', '避免刺激性食物']
        }
    },
    { id: 'dis_006', name: '骨关节炎', type: 'disease',
        detail: {
            英文名称: 'Osteoarthritis',
            ICD10: 'M19',
            发病部位: '关节软骨',
            所属科室: '风湿免疫科',
            临床症状: ['关节痛', '关节僵硬', '活动受限', '关节肿胀'],
            治疗方案: ['止痛治疗', '物理治疗', '关节腔注射', '关节置换术'],
            常用药物: ['布洛芬', '对乙酰氨基酚', '氨基葡萄糖', '双氯芬酸'],
            并发症: ['关节畸形', '肌肉萎缩', '功能障碍'],
            高危因素: ['年龄增长', '肥胖', '关节损伤史', '遗传因素'],
            影像学检查: ['X线检查', 'MRI'],
            预防措施: ['控制体重', '适当运动', '关节保护']
        }
    },
    { id: 'dis_007', name: '支气管哮喘', type: 'disease',
        detail: {
            英文名称: 'Bronchial Asthma',
            ICD10: 'J45',
            发病部位: '支气管',
            所属科室: '呼吸内科',
            临床症状: ['喘息', '呼吸困难', '胸闷', '咳嗽', '夜间加重'],
            治疗方案: ['吸入激素', '支气管舒张剂', '脱敏治疗', '急性发作抢救'],
            常用药物: ['沙丁胺醇', '布地奈德', '孟鲁司特', '茶碱'],
            并发症: ['呼吸衰竭', '肺气肿', '气胸', '肺心病'],
            高危因素: ['过敏史', '家族史', '环境因素', '呼吸道感染'],
            辅助检查: ['肺功能', '过敏原检测', '呼出气一氧化氮'],
            预防措施: ['避免过敏原', '规律用药', '定期复查']
        }
    },
    { id: 'dis_008', name: '脑卒中', type: 'disease',
        detail: {
            英文名称: 'Stroke',
            ICD10: 'I64',
            发病部位: '脑血管',
            所属科室: '神经内科',
            临床症状: ['偏瘫', '言语障碍', '意识障碍', '面部歪斜', '感觉异常'],
            治疗方案: ['溶栓治疗', '抗血小板治疗', '康复训练', '手术治疗'],
            常用药物: ['阿司匹林', '氯吡格雷', 'rt-PA溶栓药', '他汀类'],
            并发症: ['偏瘫', '认知障碍', '吞咽困难', '抑郁', '癫痫'],
            高危因素: ['高血压', '房颤', '糖尿病', '高血脂', '吸烟'],
            影像学检查: ['头颅CT', '头颅MRI', '脑血管造影'],
            预防措施: ['控制血压', '抗凝治疗', '健康生活方式']
        }
    }
]

// ==================== 2. 药物数据 ====================
const drugs = [
    { id: 'drug_001', name: '硝苯地平', type: 'drug',
        detail: { 药物类别: '钙通道阻滞剂', 适应症: ['高血压', '心绞痛'], 用法用量: '口服，每次10-20mg，每日2次', 副作用: ['头痛', '面部潮红', '踝部水肿'] } },
    { id: 'drug_002', name: '二甲双胍', type: 'drug',
        detail: { 药物类别: '双胍类降糖药', 适应症: ['2型糖尿病'], 用法用量: '口服，每次0.5g，每日2-3次', 副作用: ['胃肠道反应', '乳酸酸中毒罕见'] } },
    { id: 'drug_003', name: '阿司匹林', type: 'drug',
        detail: { 药物类别: '抗血小板药', 适应症: ['心脑血管疾病预防', '发热疼痛'], 用法用量: '口服，每次100mg，每日1次', 副作用: ['胃肠道刺激', '出血风险'] } },
    { id: 'drug_004', name: '阿莫西林', type: 'drug',
        detail: { 药物类别: '青霉素类抗生素', 适应症: ['细菌感染', '肺炎'], 用法用量: '口服，每次0.5g，每日3次', 副作用: ['过敏反应', '腹泻'] } },
    { id: 'drug_005', name: '奥美拉唑', type: 'drug',
        detail: { 药物类别: '质子泵抑制剂', 适应症: ['胃食管反流', '胃炎'], 用法用量: '口服，每次20mg，每日1次', 副作用: ['头痛', '腹泻'] } },
    { id: 'drug_006', name: '布洛芬', type: 'drug',
        detail: { 药物类别: '非甾体抗炎药', 适应症: ['关节炎', '疼痛'], 用法用量: '口服，每次200-400mg，每日3次', 副作用: ['胃肠道反应', '肾功能损害'] } },
    { id: 'drug_007', name: '沙丁胺醇', type: 'drug',
        detail: { 药物类别: 'β2受体激动剂', 适应症: ['支气管哮喘'], 用法用量: '吸入，每次1-2喷，每日3-4次', 副作用: ['心悸', '震颤'] } }
]

// ==================== 3. 症状数据 ====================
const symptoms = [
    { id: 'sym_001', name: '头痛', type: 'symptom', detail: { 常见于: ['高血压', '偏头痛', '紧张性头痛'] } },
    { id: 'sym_002', name: '头晕', type: 'symptom', detail: { 常见于: ['高血压', '低血压', '贫血'] } },
    { id: 'sym_003', name: '咳嗽', type: 'symptom', detail: { 常见于: ['肺炎', '支气管炎', '哮喘'] } },
    { id: 'sym_004', name: '发热', type: 'symptom', detail: { 常见于: ['肺炎', '感染性疾病'] } },
    { id: 'sym_005', name: '胸痛', type: 'symptom', detail: { 常见于: ['冠心病', '心绞痛', '心肌梗死'] } },
    { id: 'sym_006', name: '关节痛', type: 'symptom', detail: { 常见于: ['骨关节炎', '类风湿关节炎'] } },
    { id: 'sym_007', name: '呼吸困难', type: 'symptom', detail: { 常见于: ['哮喘', '心衰', '肺炎'] } },
    { id: 'sym_008', name: '多饮多尿', type: 'symptom', detail: { 常见于: ['糖尿病'] } },
    { id: 'sym_009', name: '心悸', type: 'symptom', detail: { 常见于: ['高血压', '冠心病', '心律失常'] } },
    { id: 'sym_010', name: '腹痛', type: 'symptom', detail: { 常见于: ['胃炎', '胃溃疡'] } }
]

// ==================== 4. 科室数据 ====================
const departments = [
    { id: 'dept_001', name: '心血管内科', type: 'department', detail: { 诊疗范围: ['高血压', '冠心病', '心律失常'] } },
    { id: 'dept_002', name: '内分泌科', type: 'department', detail: { 诊疗范围: ['糖尿病', '甲状腺疾病'] } },
    { id: 'dept_003', name: '呼吸内科', type: 'department', detail: { 诊疗范围: ['肺炎', '哮喘', '慢阻肺'] } },
    { id: 'dept_004', name: '消化内科', type: 'department', detail: { 诊疗范围: ['胃炎', '胃溃疡'] } },
    { id: 'dept_005', name: '风湿免疫科', type: 'department', detail: { 诊疗范围: ['关节炎'] } },
    { id: 'dept_006', name: '神经内科', type: 'department', detail: { 诊疗范围: ['脑卒中', '头痛'] } }
]

// ==================== 5. 关系数据（边） ====================
const edges = [
    // 疾病-药物关系
    { source: 'dis_001', target: 'drug_001', label: '常用药物' },
    { source: 'dis_002', target: 'drug_002', label: '一线用药' },
    { source: 'dis_003', target: 'drug_003', label: '抗血小板治疗' },
    { source: 'dis_004', target: 'drug_004', label: '抗生素治疗' },
    { source: 'dis_005', target: 'drug_005', label: '抑酸治疗' },
    { source: 'dis_006', target: 'drug_006', label: '止痛治疗' },
    { source: 'dis_007', target: 'drug_007', label: '急性缓解' },
    { source: 'dis_008', target: 'drug_003', label: '二级预防' },

    // 疾病-症状关系
    { source: 'dis_001', target: 'sym_001', label: '常见症状' },
    { source: 'dis_001', target: 'sym_002', label: '常见症状' },
    { source: 'dis_001', target: 'sym_009', label: '常见症状' },
    { source: 'dis_002', target: 'sym_008', label: '典型症状' },
    { source: 'dis_003', target: 'sym_005', label: '典型症状' },
    { source: 'dis_003', target: 'sym_009', label: '常见症状' },
    { source: 'dis_004', target: 'sym_003', label: '典型症状' },
    { source: 'dis_004', target: 'sym_004', label: '典型症状' },
    { source: 'dis_004', target: 'sym_007', label: '常见症状' },
    { source: 'dis_005', target: 'sym_010', label: '主要症状' },
    { source: 'dis_006', target: 'sym_006', label: '主要症状' },
    { source: 'dis_007', target: 'sym_007', label: '典型症状' },
    { source: 'dis_007', target: 'sym_003', label: '常见症状' },
    { source: 'dis_008', target: 'sym_001', label: '可能症状' },

    // 疾病-科室关系
    { source: 'dis_001', target: 'dept_001', label: '就诊科室' },
    { source: 'dis_002', target: 'dept_002', label: '就诊科室' },
    { source: 'dis_003', target: 'dept_001', label: '就诊科室' },
    { source: 'dis_004', target: 'dept_003', label: '就诊科室' },
    { source: 'dis_005', target: 'dept_004', label: '就诊科室' },
    { source: 'dis_006', target: 'dept_005', label: '就诊科室' },
    { source: 'dis_007', target: 'dept_003', label: '就诊科室' },
    { source: 'dis_008', target: 'dept_006', label: '就诊科室' },

    // 疾病之间的并发症关系
    { source: 'dis_001', target: 'dis_003', label: '可导致' },
    { source: 'dis_001', target: 'dis_008', label: '可导致' },
    { source: 'dis_002', target: 'dis_003', label: '增加风险' },
    { source: 'dis_002', target: 'dis_008', label: '增加风险' }
]

// ==================== 6. 导出所有节点 ====================
export const graphData = {
    nodes: [...diseases, ...drugs, ...symptoms, ...departments],
    edges: edges
}

// 获取所有实体分类
export const getAllEntities = () => {
    return {
        diseases: diseases,
        drugs: drugs,
        symptoms: symptoms,
        departments: departments
    }
}

// 根据实体ID获取详情
export const getEntityDetail = (entityId) => {
    const node = graphData.nodes.find(n => n.id === entityId)
    return node?.detail || {}
}

// 根据实体ID获取子图（该实体为中心的2层关系）
export const getSubGraph = (entityId) => {
    const centerNode = graphData.nodes.find(n => n.id === entityId)
    if (!centerNode) return { nodes: [], edges: [] }

    // 找到所有直接相关的边
    const relatedEdges = graphData.edges.filter(
        e => e.source === entityId || e.target === entityId
    )

    // 找到相关的节点
    const relatedNodeIds = new Set([entityId])
    relatedEdges.forEach(edge => {
        relatedNodeIds.add(edge.source)
        relatedNodeIds.add(edge.target)
    })

    // 二阶关系（让子图更丰富）
    const secondLevelIds = new Set()
    relatedEdges.forEach(edge => {
        const neighborId = edge.source === entityId ? edge.target : edge.source
        const neighborEdges = graphData.edges.filter(
            e => e.source === neighborId || e.target === neighborId
        )
        neighborEdges.forEach(ne => {
            secondLevelIds.add(ne.source)
            secondLevelIds.add(ne.target)
        })
    })

    const allNodeIds = new Set([...relatedNodeIds, ...secondLevelIds])
    const relatedNodes = graphData.nodes.filter(n => allNodeIds.has(n.id))
    const allEdges = graphData.edges.filter(
        e => allNodeIds.has(e.source) && allNodeIds.has(e.target)
    )

    return { nodes: relatedNodes, edges: allEdges }
}