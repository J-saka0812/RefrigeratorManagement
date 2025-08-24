import React from 'react'

export function StatsCards() {
    return (
        <div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div class="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-gray-600 text-sm font-medium">総食品数</p>
                            <p class="text-3xl font-bold text-green-600">12</p>
                        </div>
                        <div class="bg-gradient-to-br from-green-100 to-emerald-100 w-12 h-12 rounded-full flex items-center justify-center">
                            <span class="text-2xl">📦</span>
                        </div>
                    </div>
                </div>
                <div class="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-gray-600 text-sm font-medium">期限切れ間近</p>
                            <p class="text-3xl font-bold text-orange-500">3</p>
                        </div>
                        <div class="bg-gradient-to-br from-orange-100 to-yellow-100 w-12 h-12 rounded-full flex items-center justify-center">
                            <span class="text-2xl">⚠️</span>
                        </div>
                    </div>
                </div>
                <div class="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-gray-600 text-sm font-medium">期限切れ</p>
                            <p class="text-3xl font-bold text-red-500">1</p>
                        </div>
                        <div class="bg-gradient-to-br from-red-100 to-pink-100 w-12 h-12 rounded-full flex items-center justify-center">
                            <span class="text-2xl">🚨</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
