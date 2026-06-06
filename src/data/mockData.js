// src/data/mockData.js
// 抗肿瘤静脉给药知识图谱数据

// ==================== 图谱颜色配置 ====================
export const graphColors = {
    level1: '#E74C3C',   // 一级菜单 - 红色
    level2: '#3498DB',   // 二级菜单 - 蓝色
    level3: '#F39C12'    // 三级药物 - 橙色
}

// ==================== 左侧菜单配置（数据源） ====================
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
                "使用中心静脉血管通路进行抗肿瘤药物给药时，应执行：":
                    "• 回抽血液确认导管在静脉管腔内<br>" +
                    "• 评估导管有无脱出、移位，输液港注射座有无翻转、外露<br>" +
                    "• 评估穿刺区域及沿血管走向的皮肤有无疼痛、发红、肿胀、烧灼感等<br>" +
                    "• 推注发疱性抗肿瘤药物时，每推注 2～5 ml 药液，应评估并确认静脉回血<br>",
                "发现药物外渗时应立即停止给药，并遵循 T/CNAS 05—2019 及药品说明书进行处理":
                    "• 生命体征，并遵医嘱使用心电监护<br>" +
                    "• 过敏症状，如皮疹、瘙痒、胸闷、呼吸困难等<br>" +
                    "• 其他输液反应，如心慌、出汗、寒战、发热等<br>" +
                    "• 消化道反应，如恶心、呕吐及呕吐物的颜色、性质、量、次数<br>" +
                    "• 体液平衡情况，包括摄入量（进食、饮水情况）及大小便情况（颜色、性质、量）<br>",
                "给药期间应严密监测患者病情": "",
                "给药后应再次核对患者身份信息及药品信息，完成护理记录": "",
            }
        }
    },
    {
        key: 'occupationalProtection',
        label: '职业防护',
        children: [],
        content: {
            type: 'drugDetail',
            drugName: '利妥昔单抗',
            detail: {
                "戴双层手套": "",
                "戴口罩": "",
                "换药时确保瓶/口朝上": "",
                "治疗结束后不分离输液瓶/袋与输液器，将其整体放入黄色医疗垃圾袋": "",
                "使用便携式输液泵输注抗肿瘤药物结束后，便携式输液泵丢弃前需使用专用导管帽套住圆锥接头或单独装入黄色医疗垃圾袋中，有效密封垃圾袋": "",
                "有毒性药物标识的黄色带盖容器收集含抗肿瘤药物的医疗废弃物，容器内套双层黄色医疗垃圾袋，当容器 3/4 满时，有效封口垃圾袋并贴上专用标识": "",
                "在使用抗肿瘤药物的环境中配备溢出包，内含防水隔离衣、一次性口罩、橡胶/丁腈手套、面罩、护目镜、鞋套、吸水垫及医疗垃圾袋等": "",
                "抗肿瘤药物外溢时，立即关闭空调，遵循 WS/T 433—2023中 8.2.6 处理。溢出现场清理完成后应通风换气，可对清理后的区域进行环境检测。": "",
            }
        }
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
                                "药物性质": "靶向",
                                "溶媒": "0.9%氯化钠注射液/5%葡萄糖注射液",
                                "溶媒量（ml）": "/",
                                "浓度（mg/ml）": "1",
                                "输液时间（min）": "首次50mg/h，如果无输液反应，可每30min 增加50mg/h；后续100mg/h，每30min 增加100 mg/h。最大速度400mg/h",
                                "稳定性（h）": "12（室温）24（2°C～8°C）",
                                "注意事项": "/"
                            }
                        }
                    },
                    {
                        key: 'cetuximab',
                        label: '西妥昔单抗',
                        content: {
                            type: 'drugDetail',
                            drugName: '西妥昔单抗',
                            detail: {
                                "药物性质": "靶向",
                                "溶媒": "0.9%氯化钠注射液",
                                "溶媒量（ml）": "/",
                                "浓度（mg/ml）": "/",
                                "输液时间（min）": "首次120，耐受良好后续60",
                                "稳定性（h）": "现配现用",
                                "注意事项": "/"
                            }
                        }
                    },
                    {
                        key: 'pertuzumab',
                        label: '帕妥珠单抗',
                        content: {
                            type: 'drugDetail',
                            drugName: '帕妥珠单抗',
                            detail: {
                                "药物性质": "靶向",
                                "溶媒": "0.9%氯化钠注射液",
                                "溶媒量（ml）": "250",
                                "浓度（mg/ml）": "1.6～3.0",
                                "输液时间（min）": "起始剂量为840mg，静脉输注时间为 60min；给药剂量为420mg，静脉输注时间为30～60min。曲妥珠单抗与帕妥珠单抗联合使用时，本品起始剂量按8mg/kg，静脉输注时间为90 min；此后每3周一次，本品剂量按 6mg/kg，静脉输注时间为30～90min",
                                "稳定性（h）": "24",
                                "注意事项": "/"
                            }
                        }
                    },
                    {
                        key: 'trastuzumab',
                        label: '曲妥珠单抗',
                        content: {
                            type: 'drugDetail',
                            drugName: '曲妥珠单抗',
                            detail: {
                                "药物性质": "靶向",
                                "溶媒": "0.9%氯化钠注射液",
                                "溶媒量（ml）": "259",
                                "浓度（mg/ml）": "21",
                                "输液时间（min）": "首次＞90，耐受良好后续30",
                                "稳定性（h）": "24",
                                "注意事项": "/"
                            }
                        }
                    },
                    {
                        key: 'nimotuzumab',
                        label: '尼妥珠单抗',
                        content: {
                            type: 'drugDetail',
                            drugName: '尼妥珠单抗',
                            detail: {
                                "药物性质": "靶向",
                                "溶媒": "0.9%氯化钠注射液",
                                "溶媒量（ml）": "250",
                                "浓度（mg/ml）": "/",
                                "输液时间（min）": "＞60",
                                "稳定性（h）": "8（室温）24（2°C～8°C）",
                                "注意事项": "/"
                            }
                        }
                    },
                    {
                        key: 'bevacizumab',
                        label: '贝伐珠单抗',
                        content: {
                            type: 'drugDetail',
                            drugName: '贝伐珠单抗',
                            detail: {
                                "药物性质": "靶向",
                                "溶媒": "0.9%氯化钠注射液",
                                "溶媒量（ml）": "/",
                                "浓度（mg/ml）": "1.4～16.5",
                                "输液时间（min）": "首次＞90，耐受良好第二次60，耐受良好后续30",
                                "稳定性（h）": "24",
                                "注意事项": "/"
                            }
                        }
                    },
                ],
            },
            {
                key: 'immunotherapy',
                label: '免疫治疗药物',
                children: [
                    {
                        key: 'immunotherapy1',
                        label: '信迪利单抗',
                        content: {
                            type: 'drugDetail',
                            drugName: '信迪利单抗',
                            detail: {
                                "药物性质": "",
                                "溶媒": "",
                                "溶媒量（ml）": "",
                                "浓度（mg/ml）": "",
                                "输液时间（min）": "",
                                "稳定性（h）": "",
                                "注意事项": "/"
                            }
                        }
                    },
                    {
                        key: 'immunotherapy2',
                        label: '阿替利珠单抗',
                        content: {
                            type: 'drugDetail',
                            drugName: '阿替利珠单抗',
                            detail: {
                                "药物性质": "免疫检查点抑制剂",
                                "溶媒": "0.9%氯化钠注射液",
                                "溶媒量（ml）": "100",
                                "浓度（mg/ml）": "1.5～5",
                                "输液时间（min）": "30～60",
                                "稳定性（h）": "6（室温）24（2°C～8°C）",
                                "注意事项": "/"
                            }
                        }
                    },
                    {
                        key: 'immunotherapy3',
                        label: '替雷利珠单抗',
                        content: {
                            type: 'drugDetail',
                            drugName: '替雷利珠单抗',
                            detail: {
                                "药物性质": "免疫检查点抑制剂",
                                "溶媒": "0.9%氯化钠注射液",
                                "溶媒量（ml）": "/",
                                "浓度（mg/ml）": "/",
                                "输液时间（min）": "首次＞60，耐受良好后续＞30",
                                "稳定性（h）": "8（室温）24（2°C～8°C）",
                                "注意事项": "/"
                            }
                        }
                    },
                    {
                        key: 'immunotherapy4',
                        label: '度伐利尤单抗',
                        content: {
                            type: 'drugDetail',
                            drugName: '度伐利尤单抗',
                            detail: {
                                "药物性质": "免疫检查点抑制剂",
                                "溶媒": "0.9%氯化钠注射液/5%葡萄糖注射液",
                                "溶媒量（ml）": "/",
                                "浓度（mg/ml）": "1～15",
                                "输液时间（min）": "＞60",
                                "稳定性（h）": "4（室温）24（2°C～8°C）",
                                "注意事项": "/"
                            }
                        }
                    },
                    {
                        key: 'immunotherapy5',
                        label: '纳武利尤单抗',
                        content: {
                            type: 'drugDetail',
                            drugName: '纳武利尤单抗',
                            detail: {
                                "药物性质": "免疫检查点抑制剂",
                                "溶媒": "0.9%氯化钠注射液 /5%葡萄糖注射液",
                                "溶媒量（ml）": "/",
                                "浓度（mg/ml）": "1/10",
                                "输液时间（min）": "60",
                                "稳定性（h）": "8（室温）24（2°C～8°C）",
                                "注意事项": "/"
                            }
                        }
                    },
                    {
                        key: 'immunotherapy6',
                        label: '特瑞普利单抗',
                        content: {
                            type: 'drugDetail',
                            drugName: '特瑞普利单抗',
                            detail: {
                                "药物性质": "免疫检查点抑制剂",
                                "溶媒": "0.9%氯化钠注射液",
                                "溶媒量（ml）": "100",
                                "浓度（mg/ml）": "1～3",
                                "输液时间（min）": "首次＞60，耐受良好后续30",
                                "稳定性（h）": "8（室温）24（2°C～8°C）",
                                "注意事项": "/"
                            }
                        }
                    },
                    {
                        key: 'immunotherapy7',
                        label: '帕博利珠单抗',
                        content: {
                            type: 'drugDetail',
                            drugName: '帕博利珠单抗',
                            detail: {
                                "药物性质": "免疫检查点抑制剂",
                                "溶媒": "0.9%氯化钠注射液/5%葡萄糖注射液",
                                "溶媒量（ml）": "/",
                                "浓度（mg/ml）": "1～10",
                                "输液时间（min）": "＞30",
                                "稳定性（h）": "6（室温）24（2°C～8°C）",
                                "注意事项": "/"
                            }
                        }
                    },
                    {
                        key: 'immunotherapy8',
                        label: '卡瑞利珠单抗',
                        content: {
                            type: 'drugDetail',
                            drugName: '卡瑞利珠单抗',
                            detail: {
                                "药物性质": "免疫检查点抑制剂",
                                "溶媒": "0.9%氯化钠注射液/5%葡萄糖注射液",
                                "溶媒量（ml）": "/",
                                "浓度（mg/ml）": "/",
                                "输液时间（min）": "30～60",
                                "稳定性（h）": "6（室温）24（2°C～8°C）",
                                "注意事项": "/"
                            }
                        }
                    },
                ],
            },
            {
                key: 'endocrine',
                label: '内分泌治疗药物',
                children: [],
            },
            {
                key: 'chemotherapy',
                label: '化学治疗药物',
                children: [
                    {
                        key: 'chemotherapy1',
                        label: '氟达拉滨',
                        content: {
                            type: 'drugDetail',
                            drugName: '氟达拉滨',
                            detail: {
                                "药物性质": "",
                                "溶媒": "",
                                "溶媒量（ml）": "",
                                "浓度（mg/ml）": "",
                                "输液时间（min）": "",
                                "稳定性（h）": "",
                                "注意事项": "/"
                            }
                        }
                    },
                ],
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
const level1Keys = leftMenuConfig.map(item => item.key)

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