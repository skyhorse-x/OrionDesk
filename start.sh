#!/bin/bash

set -e

echo "======================================"
echo "    OrionDesk 启动脚本"
echo "======================================"

check_dependency() {
    if ! command -v "$1" &> /dev/null; then
        echo "❌ 错误: $1 未安装，请先安装 $1"
        exit 1
    fi
}

echo "🔍 检查依赖..."
check_dependency bun
check_dependency node

echo "📦 安装依赖..."
bun install

echo "🚀 启动开发服务器..."
echo ""
echo "前端服务: http://localhost:4173"
echo "后端服务: http://localhost:17870"
echo ""
echo "按 Ctrl+C 停止服务"
echo ""

bun dev