"use client"

import { cn } from "@/lib/utils"
import {
  ChevronDown,
  ChevronRight,
  Download,
  FileText,
  ArrowRight,
  Search,
  Calendar,
  Plus,
  Users,
  CreditCard,
  Building2,
  BadgeCheck,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  Share,
  BarChart3,
  TrendingUp,
  Clock,
  DollarSign
} from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import { useState, useEffect, useCallback } from "react"
import { useSearchParams } from "next/navigation"
import AssetDetail from "./asset-detail"
import TFSADetail from "./tfsa-detail"

// Professional TradingView-style chart component
const TradingActivityChart = ({ assetId, assetName }: { assetId: string, assetName: string }) => {
  const [isVisible, setIsVisible] = useState(false)
  const [timeframe, setTimeframe] = useState('1D')
  const [chartType, setChartType] = useState('candlestick')
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [tooltipData, setTooltipData] = useState<{ x: number; y: number; data: any } | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [showIndicators, setShowIndicators] = useState(false)
  const [showDrawing, setShowDrawing] = useState(false)
  const [drawingMode, setDrawingMode] = useState<'line' | 'rectangle' | 'fibonacci' | null>(null)

  useEffect(() => {
    setIsVisible(true)
    // Simulate data loading
    const timer = setTimeout(() => setIsLoading(false), 500)
    return () => clearTimeout(timer)
  }, [])

  // Comprehensive market data
  const marketData = {
    currentPrice: 15.65,
    change: 0.47,
    changePercent: 3.09,
    volume: 2456789,
    high: 15.72,
    low: 15.18,
    open: 15.20,
    prevClose: 15.18,
    marketCap: 2456789000,
    peRatio: 18.5,
    dividendYield: 2.1
  }

  // Data for different timeframes
  const getDataForTimeframe = (tf: string) => {
    switch (tf) {
      case '1D':
        return [
          { time: '09:30', open: 15.20, high: 15.25, low: 15.18, close: 15.22, volume: 125000 },
          { time: '10:00', open: 15.22, high: 15.30, low: 15.20, close: 15.28, volume: 189000 },
          { time: '10:30', open: 15.28, high: 15.35, low: 15.25, close: 15.32, volume: 234000 },
          { time: '11:00', open: 15.32, high: 15.40, low: 15.30, close: 15.38, volume: 298000 },
          { time: '11:30', open: 15.38, high: 15.45, low: 15.35, close: 15.42, volume: 345000 },
          { time: '12:00', open: 15.42, high: 15.50, low: 15.40, close: 15.48, volume: 412000 },
          { time: '12:30', open: 15.48, high: 15.55, low: 15.45, close: 15.52, volume: 378000 },
          { time: '13:00', open: 15.52, high: 15.60, low: 15.50, close: 15.58, volume: 456000 },
          { time: '13:30', open: 15.58, high: 15.65, low: 15.55, close: 15.62, volume: 523000 },
          { time: '14:00', open: 15.62, high: 15.70, low: 15.60, close: 15.68, volume: 589000 },
          { time: '14:30', open: 15.68, high: 15.72, low: 15.65, close: 15.70, volume: 445000 },
          { time: '15:00', open: 15.70, high: 15.72, low: 15.68, close: 15.71, volume: 378000 },
          { time: '15:30', open: 15.71, high: 15.72, low: 15.69, close: 15.70, volume: 234000 },
          { time: '16:00', open: 15.70, high: 15.71, low: 15.67, close: 15.69, volume: 189000 },
          { time: '16:30', open: 15.69, high: 15.70, low: 15.66, close: 15.68, volume: 156000 },
          { time: '17:00', open: 15.68, high: 15.69, low: 15.65, close: 15.65, volume: 123000 }
        ]
      case '1W':
        return [
          { time: 'Mon', open: 15.10, high: 15.25, low: 15.05, close: 15.20, volume: 1250000 },
          { time: 'Tue', open: 15.20, high: 15.35, low: 15.15, close: 15.30, volume: 1890000 },
          { time: 'Wed', open: 15.30, high: 15.45, low: 15.25, close: 15.40, volume: 2340000 },
          { time: 'Thu', open: 15.40, high: 15.55, low: 15.35, close: 15.50, volume: 2980000 },
          { time: 'Fri', open: 15.50, high: 15.65, low: 15.45, close: 15.60, volume: 3450000 },
          { time: 'Sat', open: 15.60, high: 15.70, low: 15.55, close: 15.65, volume: 1230000 },
          { time: 'Sun', open: 15.65, high: 15.72, low: 15.60, close: 15.65, volume: 890000 }
        ]
      case '1M':
        return [
          { time: 'Week 1', open: 15.00, high: 15.20, low: 14.95, close: 15.15, volume: 8500000 },
          { time: 'Week 2', open: 15.15, high: 15.35, low: 15.10, close: 15.30, volume: 9200000 },
          { time: 'Week 3', open: 15.30, high: 15.50, low: 15.25, close: 15.45, volume: 10500000 },
          { time: 'Week 4', open: 15.45, high: 15.65, low: 15.40, close: 15.60, volume: 11800000 },
          { time: 'Week 5', open: 15.60, high: 15.72, low: 15.55, close: 15.65, volume: 12500000 }
        ]
      default:
        return []
    }
  }

  const candlestickData = getDataForTimeframe(timeframe)

  // Chart dimensions
  const chartWidth = 800
  const chartHeight = 400
  const padding = 60
  
  // Calculate price range
  const prices = candlestickData.map(d => [d.low, d.high]).flat()
  const minPrice = Math.min(...prices)
  const maxPrice = Math.max(...prices)
  const priceRange = maxPrice - minPrice

  // Helper functions
  const getXPosition = (index: number) => {
    return padding + (index / (candlestickData.length - 1)) * (chartWidth - 2 * padding)
  }

  const getYPosition = (price: number) => {
    return padding + (chartHeight - 2 * padding) - ((price - minPrice) / priceRange) * (chartHeight - 2 * padding)
  }

  const handleMouseMove = useCallback((event: React.MouseEvent<SVGSVGElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const x = event.clientX - rect.left
    
    // Find the closest data point
    let closestIndex = 0
    let minDistance = Infinity
    
    candlestickData.forEach((_, index) => {
      const dataX = getXPosition(index)
      const distance = Math.abs(x - dataX)
      if (distance < minDistance) {
        minDistance = distance
        closestIndex = index
      }
    })

    setHoveredIndex(closestIndex)
    setTooltipData({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
      data: candlestickData[closestIndex]
    })
  }, [candlestickData])

  const handleMouseLeave = useCallback(() => {
    setHoveredIndex(null)
    setTooltipData(null)
  }, [])

  const handleTimeframeChange = (newTimeframe: string) => {
    setTimeframe(newTimeframe)
    setIsLoading(true)
    setTimeout(() => setIsLoading(false), 300)
  }

  const handleChartTypeChange = (newType: string) => {
    setChartType(newType)
  }

  const toggleIndicators = () => {
    setShowIndicators(!showIndicators)
  }

  const toggleDrawing = () => {
    setShowDrawing(!showDrawing)
    if (showDrawing) {
      setDrawingMode(null)
    }
  }

  const setDrawingTool = (tool: 'line' | 'rectangle' | 'fibonacci' | null) => {
    setDrawingMode(tool)
  }

  if (isLoading) {
    return (
      <div className="w-full bg-white rounded-xl border border-gray-200 p-8 shadow-sm">
        <div className="flex items-center justify-center h-64">
          <div className="flex flex-col items-center gap-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="text-sm text-gray-600">Loading {timeframe} data...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`w-full transition-all duration-500 ease-out ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      {/* Market Summary Header */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm mb-6 chart-fade-in">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-6 gap-4">
          <div>
            <h3 className="text-2xl font-bold text-gray-900">{assetName}</h3>
            <p className="text-sm text-gray-600">Real-time market data</p>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="text-right">
              <div className="text-3xl lg:text-4xl font-bold text-gray-900">
                ${marketData.currentPrice.toFixed(2)}
              </div>
              <div className={`text-sm font-medium ${marketData.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {marketData.change >= 0 ? '+' : ''}{marketData.change.toFixed(2)} ({marketData.changePercent.toFixed(2)}%)
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant={timeframe === '1D' ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleTimeframeChange('1D')}
                className="text-xs chart-hover"
              >
                1D
              </Button>
              <Button
                variant={timeframe === '1W' ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleTimeframeChange('1W')}
                className="text-xs chart-hover"
              >
                1W
              </Button>
              <Button
                variant={timeframe === '1M' ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleTimeframeChange('1M')}
                className="text-xs chart-hover"
              >
                1M
              </Button>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="text-xs text-gray-600">Volume</div>
            <div className="text-sm font-semibold text-gray-900">
              {(marketData.volume / 1000000).toFixed(1)}M
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="text-xs text-gray-600">High</div>
            <div className="text-sm font-semibold text-gray-900">${marketData.high.toFixed(2)}</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="text-xs text-gray-600">Low</div>
            <div className="text-sm font-semibold text-gray-900">${marketData.low.toFixed(2)}</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="text-xs text-gray-600">Open</div>
            <div className="text-sm font-semibold text-gray-900">${marketData.open.toFixed(2)}</div>
          </div>
        </div>

        {/* Trading Tools */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Chart Type Selector */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-gray-700">Chart:</span>
            <Select value={chartType} onValueChange={handleChartTypeChange}>
              <SelectTrigger className="w-24 h-8 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="candlestick">Candle</SelectItem>
                <SelectItem value="line">Line</SelectItem>
                <SelectItem value="area">Area</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Indicators */}
          <div className="flex items-center gap-2">
            <Button
              variant={showIndicators ? 'default' : 'outline'}
              size="sm"
              onClick={toggleIndicators}
              className="text-xs"
            >
              Indicators
            </Button>
            {showIndicators && (
              <div className="flex gap-1">
                <Button variant="outline" size="sm" className="text-xs">MA</Button>
                <Button variant="outline" size="sm" className="text-xs">RSI</Button>
                <Button variant="outline" size="sm" className="text-xs">MACD</Button>
              </div>
            )}
          </div>

          {/* Drawing Tools */}
          <div className="flex items-center gap-2">
            <Button
              variant={showDrawing ? 'default' : 'outline'}
              size="sm"
              onClick={toggleDrawing}
              className="text-xs"
            >
              Drawing
            </Button>
            {showDrawing && (
              <div className="flex gap-1">
                <Button 
                  variant={drawingMode === 'line' ? 'default' : 'outline'} 
                  size="sm" 
                  className="text-xs"
                  onClick={() => setDrawingTool(drawingMode === 'line' ? null : 'line')}
                >
                  Line
                </Button>
                <Button 
                  variant={drawingMode === 'rectangle' ? 'default' : 'outline'} 
                  size="sm" 
                  className="text-xs"
                  onClick={() => setDrawingTool(drawingMode === 'rectangle' ? null : 'rectangle')}
                >
                  Box
                </Button>
                <Button 
                  variant={drawingMode === 'fibonacci' ? 'default' : 'outline'} 
                  size="sm" 
                  className="text-xs"
                  onClick={() => setDrawingTool(drawingMode === 'fibonacci' ? null : 'fibonacci')}
                >
                  Fib
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Professional Chart Container */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden chart-fade-in">
        {/* Chart Area */}
        <div className="relative" style={{ height: `${chartHeight + 100}px` }}>
          <svg 
            width="100%" 
            height="100%" 
            className="absolute inset-0"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            {/* Grid Lines */}
            {[0, 1, 2, 3, 4].map(i => (
              <g key={i}>
                <line
                  x1={padding}
                  y1={padding + (i * (chartHeight - 2 * padding)) / 4}
                  x2={chartWidth - padding}
                  y2={padding + (i * (chartHeight - 2 * padding)) / 4}
                  stroke="#e5e7eb"
                  strokeWidth="1"
                  strokeDasharray="2,2"
                />
                <text
                  x={padding - 10}
                  y={padding + (i * (chartHeight - 2 * padding)) / 4}
                  textAnchor="end"
                  className="text-xs fill-gray-500"
                  dominantBaseline="middle"
                >
                  ${(maxPrice - (i * priceRange / 4)).toFixed(2)}
                </text>
              </g>
            ))}

            {/* Time Labels */}
            {candlestickData.filter((_, i) => i % 3 === 0).map((data, i) => (
              <text
                key={i}
                x={getXPosition(i * 3)}
                y={chartHeight - 10}
                textAnchor="middle"
                className="text-xs fill-gray-500"
              >
                {data.time}
              </text>
            ))}

            {/* Chart Content */}
            {chartType === 'candlestick' ? (
              // Candlestick Chart
              <g>
                {candlestickData.map((data, index) => {
                  const x = getXPosition(index)
                  const openY = getYPosition(data.open)
                  const closeY = getYPosition(data.close)
                  const highY = getYPosition(data.high)
                  const lowY = getYPosition(data.low)
                  const isGreen = data.close >= data.open
                  const candleWidth = Math.max(4, (chartWidth - 2 * padding) / candlestickData.length * 0.8)
                  const isHovered = hoveredIndex === index
                  
                  return (
                    <g key={index}>
                      {/* Wick */}
                      <line
                        x1={x}
                        y1={highY}
                        x2={x}
                        y2={lowY}
                        stroke={isGreen ? '#10b981' : '#ef4444'}
                        strokeWidth={isHovered ? "3" : "2"}
                        className="chart-transition"
                      />
                      {/* Candle */}
                      <rect
                        x={x - candleWidth / 2}
                        y={Math.min(openY, closeY)}
                        width={candleWidth}
                        height={Math.abs(closeY - openY)}
                        fill={isGreen ? '#10b981' : '#ef4444'}
                        stroke={isGreen ? '#059669' : '#dc2626'}
                        strokeWidth={isHovered ? "2" : "1"}
                        className="chart-transition"
                        style={{ 
                          filter: isHovered ? 'drop-shadow(0 0 4px rgba(0,0,0,0.3))' : 'none'
                        }}
                      />
                    </g>
                  )
                })}
              </g>
            ) : chartType === 'line' ? (
              // Line Chart
              <g>
                <defs>
                  <filter id="lineGlow">
                    <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                    <feMerge> 
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>
                
                {/* Line Path */}
                <polyline
                  points={candlestickData.map((data, index) => {
                    const x = getXPosition(index)
                    const y = getYPosition(data.close)
                    return `${x},${y}`
                  }).join(' ')}
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ filter: 'url(#lineGlow)' }}
                />
                
                {/* Data Points */}
                {candlestickData.map((data, index) => {
                  const x = getXPosition(index)
                  const y = getYPosition(data.close)
                  const isHovered = hoveredIndex === index
                  
                  return (
                    <circle
                      key={index}
                      cx={x}
                      cy={y}
                      r={isHovered ? "6" : "3"}
                      fill="#3b82f6"
                      stroke="white"
                      strokeWidth={isHovered ? "2" : "1"}
                      className="chart-transition"
                      style={{ 
                        filter: isHovered ? 'drop-shadow(0 0 6px rgba(59, 130, 246, 0.8))' : 'none'
                      }}
                    />
                  )
                })}
              </g>
            ) : (
              // Area Chart
              <g>
                <defs>
                  <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3"/>
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.1"/>
                  </linearGradient>
                  <filter id="areaGlow">
                    <feGaussianBlur stdDeviation="1" result="coloredBlur"/>
                    <feMerge> 
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>
                
                {/* Area Path */}
                <path
                  d={`M ${candlestickData.map((data, index) => {
                    const x = getXPosition(index)
                    const y = getYPosition(data.close)
                    return `${x},${y}`
                  }).join(' L ')} L ${getXPosition(candlestickData.length - 1)},${chartHeight - padding} L ${getXPosition(0)},${chartHeight - padding} Z`}
                  fill="url(#areaGradient)"
                  stroke="#3b82f6"
                  strokeWidth="2"
                  style={{ filter: 'url(#areaGlow)' }}
                />
                
                {/* Data Points */}
                {candlestickData.map((data, index) => {
                  const x = getXPosition(index)
                  const y = getYPosition(data.close)
                  const isHovered = hoveredIndex === index
                  
                  return (
                    <circle
                      key={index}
                      cx={x}
                      cy={y}
                      r={isHovered ? "6" : "3"}
                      fill="#3b82f6"
                      stroke="white"
                      strokeWidth={isHovered ? "2" : "1"}
                      className="chart-transition"
                      style={{ 
                        filter: isHovered ? 'drop-shadow(0 0 6px rgba(59, 130, 246, 0.8))' : 'none'
                      }}
                    />
                  )
                })}
              </g>
            )}

            {/* Volume Bars */}
            <g transform={`translate(${padding}, ${chartHeight - 60})`}>
              {candlestickData.map((data, index) => {
                const x = (index / (candlestickData.length - 1)) * (chartWidth - 2 * padding)
                const volumeHeight = (data.volume / Math.max(...candlestickData.map(d => d.volume))) * 40
                const isGreen = data.close >= data.open
                const barWidth = Math.max(2, (chartWidth - 2 * padding) / candlestickData.length * 0.8)
                const isHovered = hoveredIndex === index
                
                return (
                  <rect
                    key={index}
                    x={x - barWidth / 2}
                    y={40 - volumeHeight}
                    width={barWidth}
                    height={volumeHeight}
                    fill={isGreen ? '#10b981' : '#ef4444'}
                    opacity={isHovered ? "0.8" : "0.6"}
                    className="chart-transition"
                    style={{ 
                      filter: isHovered ? 'drop-shadow(0 0 4px rgba(0,0,0,0.3))' : 'none'
                    }}
                  />
                )
              })}
            </g>

            {/* Tooltip */}
            {tooltipData && (
              <g>
                <rect
                  x={tooltipData.x + 10}
                  y={tooltipData.y - 80}
                  width="180"
                  height="70"
                  fill="rgba(0,0,0,0.9)"
                  rx="4"
                  ry="4"
                />
                <text
                  x={tooltipData.x + 20}
                  y={tooltipData.y - 60}
                  fill="white"
                  className="text-xs font-medium"
                >
                  {tooltipData.data.time}
                </text>
                <text
                  x={tooltipData.x + 20}
                  y={tooltipData.y - 45}
                  fill="white"
                  className="text-xs"
                >
                  O: ${tooltipData.data.open.toFixed(2)}
                </text>
                <text
                  x={tooltipData.x + 20}
                  y={tooltipData.y - 30}
                  fill="white"
                  className="text-xs"
                >
                  H: ${tooltipData.data.high.toFixed(2)}
                </text>
                <text
                  x={tooltipData.x + 20}
                  y={tooltipData.y - 15}
                  fill="white"
                  className="text-xs"
                >
                  L: ${tooltipData.data.low.toFixed(2)}
                </text>
                <text
                  x={tooltipData.x + 20}
                  y={tooltipData.y}
                  fill="white"
                  className="text-xs"
                >
                  C: ${tooltipData.data.close.toFixed(2)}
                </text>
                <text
                  x={tooltipData.x + 20}
                  y={tooltipData.y + 15}
                  fill="white"
                  className="text-xs"
                >
                  Vol: {(tooltipData.data.volume / 1000).toFixed(0)}K
                </text>
              </g>
            )}

            {/* Drawing Tools */}
            {drawingMode && (
              <g>
                {/* Drawing Instructions */}
                <text
                  x={chartWidth / 2}
                  y={chartHeight - 20}
                  textAnchor="middle"
                  fill="#3b82f6"
                  className="text-xs font-medium"
                >
                  {drawingMode === 'line' && 'Click to start line, click again to end'}
                  {drawingMode === 'rectangle' && 'Click and drag to draw rectangle'}
                  {drawingMode === 'fibonacci' && 'Click to set Fibonacci retracement points'}
                </text>
              </g>
            )}

            {/* Indicators */}
            {showIndicators && (
              <g>
                {/* Moving Average Line */}
                <polyline
                  points={candlestickData.map((data, index) => {
                    const x = getXPosition(index)
                    // Simple moving average calculation
                    const maValue = candlestickData
                      .slice(Math.max(0, index - 4), index + 1)
                      .reduce((sum, d) => sum + d.close, 0) / Math.min(5, index + 1)
                    const y = getYPosition(maValue)
                    return `${x},${y}`
                  }).join(' ')}
                  fill="none"
                  stroke="#f59e0b"
                  strokeWidth="2"
                  strokeDasharray="5,5"
                  opacity="0.8"
                />
                
                {/* RSI Indicator (simplified) */}
                <g transform={`translate(${padding}, ${chartHeight - 120})`}>
                  <rect
                    x="0"
                    y="0"
                    width="100"
                    height="40"
                    fill="rgba(59, 130, 246, 0.1)"
                    stroke="#3b82f6"
                    strokeWidth="1"
                  />
                  <text
                    x="50"
                    y="15"
                    textAnchor="middle"
                    fill="#3b82f6"
                    className="text-xs font-medium"
                  >
                    RSI: 65.4
                  </text>
                  <text
                    x="50"
                    y="30"
                    textAnchor="middle"
                    fill="#3b82f6"
                    className="text-xs"
                  >
                    Neutral
                  </text>
                </g>
              </g>
            )}
          </svg>
        </div>

        {/* Chart Footer */}
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between text-xs text-gray-600">
            <div className="flex items-center gap-4">
              <span>Volume: {(marketData.volume / 1000000).toFixed(1)}M</span>
              <span>Avg Volume: {(marketData.volume / 1000000).toFixed(1)}M</span>
            </div>
            <div className="flex items-center gap-4">
              <span>Last Updated: {new Date().toLocaleTimeString()}</span>
              <span>Data: Real-time</span>
            </div>
          </div>
        </div>
      </div>

      {/* Trading Tools */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        <div className="bg-white rounded-xl border border-gray-200 p-4 chart-scale-in">
          <h4 className="text-sm font-semibold text-gray-900 mb-3">Quick Actions</h4>
          <div className="space-y-2">
            <Button size="sm" className="w-full text-xs bg-green-600 hover:bg-green-700 chart-hover">
              Buy {assetName}
            </Button>
            <Button size="sm" variant="outline" className="w-full text-xs chart-hover">
              Sell {assetName}
            </Button>
            <Button size="sm" variant="outline" className="w-full text-xs chart-hover">
              Set Alert
            </Button>
          </div>
        </div>
        
        <div className="bg-white rounded-xl border border-gray-200 p-4 chart-scale-in">
          <h4 className="text-sm font-semibold text-gray-900 mb-3">Technical Indicators</h4>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span>RSI (14):</span>
              <span className="font-medium">65.4</span>
            </div>
            <div className="flex justify-between">
              <span>MACD:</span>
              <span className="font-medium text-green-600">Bullish</span>
            </div>
            <div className="flex justify-between">
              <span>Moving Avg (50):</span>
              <span className="font-medium">$15.42</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl border border-gray-200 p-4 chart-scale-in">
          <h4 className="text-sm font-semibold text-gray-900 mb-3">Market Sentiment</h4>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span>Analyst Rating:</span>
              <span className="font-medium text-green-600">Buy</span>
            </div>
            <div className="flex justify-between">
              <span>Price Target:</span>
              <span className="font-medium">$16.50</span>
            </div>
            <div className="flex justify-between">
              <span>Upside:</span>
              <span className="font-medium text-green-600">+5.4%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Type definitions
interface TradingActivity {
  date: string
  type: "Buy" | "Sell"
  units: string
  price: string
  value: string
  status: string
}

interface TrustTransaction {
  date: string
  type: "Deposit" | "Withdrawal"
  amount: string
  description: string
}

// Trading activity data for each asset
const TRADING_ACTIVITY: Record<string, TradingActivity[]> = {
  "FID-2302": [
    { date: "2024-12-15", type: "Buy", units: "50.0000", price: "$14.1588", value: "$707.94", status: "Completed" },
    { date: "2024-12-10", type: "Sell", units: "25.0000", price: "$14.2500", value: "$356.25", status: "Completed" },
    { date: "2024-12-05", type: "Buy", units: "100.0000", price: "$14.1000", value: "$1,410.00", status: "Completed" }
  ],
  "FID-2502": [
    { date: "2024-12-12", type: "Buy", units: "200.0000", price: "$14.1588", value: "$2,831.76", status: "Completed" },
    { date: "2024-12-08", type: "Buy", units: "150.0000", price: "$14.2000", value: "$2,130.00", status: "Completed" }
  ],
  "TSLA-001": [
    { date: "2024-12-14", type: "Buy", units: "100.0000", price: "$245.32", value: "$24,532.00", status: "Completed" },
    { date: "2024-12-10", type: "Sell", units: "50.0000", price: "$248.50", value: "$12,425.00", status: "Completed" },
    { date: "2024-12-05", type: "Buy", units: "200.0000", price: "$242.00", value: "$48,400.00", status: "Completed" }
  ],
  "AAPL-001": [
    { date: "2024-12-13", type: "Buy", units: "500.0000", price: "$185.64", value: "$92,820.00", status: "Completed" },
    { date: "2024-12-08", type: "Buy", units: "300.0000", price: "$184.00", value: "$55,200.00", status: "Completed" }
  ],
  "NVDA-001": [
    { date: "2024-12-15", type: "Buy", units: "100.0000", price: "$428.56", value: "$42,856.00", status: "Completed" },
    { date: "2024-12-10", type: "Buy", units: "150.0000", price: "$425.00", value: "$63,750.00", status: "Completed" }
  ]
}

// Trust transactions data
const TRUST_TRANSACTIONS: Record<string, TrustTransaction[]> = {
  "FID-2302": [
    { date: "2024-12-15", type: "Deposit", amount: "$707.94", description: "Purchase of FIDELITY GLOBAL INCOME PORTFOLIO" },
    { date: "2024-12-10", type: "Withdrawal", amount: "$356.25", description: "Sale of FIDELITY GLOBAL INCOME PORTFOLIO" }
  ],
  "TSLA-001": [
    { date: "2024-12-14", type: "Deposit", amount: "$24,532.00", description: "Purchase of TESLA INC COMMON STOCK" },
    { date: "2024-12-10", type: "Withdrawal", amount: "$12,425.00", description: "Sale of TESLA INC COMMON STOCK" }
  ],
  "AAPL-001": [
    { date: "2024-12-13", type: "Deposit", amount: "$92,820.00", description: "Purchase of APPLE INC COMMON STOCK" },
    { date: "2024-12-08", type: "Deposit", amount: "$55,200.00", description: "Purchase of APPLE INC COMMON STOCK" }
  ]
}

const ACCOUNTS = [
  {
    id: "070G225184",
    name: "TFSA Client Name, Individual Data Entry Wizard",
    beneficiary: "Estate",
    totalValue: "$14,582.16",
    holdings: [
      {
        id: "FID-2302",
        subject: "FIDELITY GLOBAL INCOME PORTFOLIO SERIES B ISC FEL CAD",
        supplierAccount: "7848697653",
        units: "196.9722",
        price: "$14.1588",
        marketValue: "$2,774.81",
        bookValue: "$2,799.99"
      },
      {
        id: "FID-2502",
        subject: "FIDELITY GLOBAL INCOME PORTFOLIO DSC DSC CAD",
        supplierAccount: "625.6722",
        units: "625.6722",
        price: "$14.1588",
        marketValue: "$33,326.39",
        bookValue: "$3,036.90"
      },
      {
        id: "FID-2928",
        subject: "FIDELITY GLOBAL INTRINSIC VALUE CLASS SERIES B ISC FEL CAD",
        supplierAccount: "8682703124",
        units: "625.6722",
        price: "$14.1588",
        marketValue: "$33,326.39",
        bookValue: "$3,838.90"
      }
    ],
    settledCAD: "$0.00",
    settledUSD: "$0.00",
    totalInCAD: "$14,584.16"
  },
  {
    id: "070G225194",
    name: "TFSA Client Name, Individual Data Entry Wizard",
    beneficiary: "Estate",
    totalValue: "$77,477.32",
    holdings: [],
    settledCAD: "$0.00",
    settledUSD: "$0.00",
    totalInCAD: "$77,477.32"
  },
  // Dashboard accounts mapped to portfolio accounts
  {
    id: "1",
    name: "Growth Portfolio - Tech & Growth Stocks",
    beneficiary: "Individual",
    totalValue: "$847,392",
    holdings: [
      {
        id: "TSLA-001",
        subject: "TESLA INC COMMON STOCK",
        supplierAccount: "NASDAQ-TSLA",
        units: "1,250.00",
        price: "$245.32",
        marketValue: "$306,650.00",
        bookValue: "$290,000.00"
      },
      {
        id: "AAPL-001",
        subject: "APPLE INC COMMON STOCK",
        supplierAccount: "NASDAQ-AAPL",
        units: "2,100.00",
        price: "$185.64",
        marketValue: "$389,844.00",
        bookValue: "$378,000.00"
      },
      {
        id: "NVDA-001",
        subject: "NVIDIA CORP COMMON STOCK",
        supplierAccount: "NASDAQ-NVDA",
        units: "350.00",
        price: "$428.56",
        marketValue: "$149,996.00",
        bookValue: "$140,000.00"
      }
    ],
    settledCAD: "$902.00",
    settledUSD: "$0.00",
    totalInCAD: "$847,392"
  },
  {
    id: "2",
    name: "Conservative Fund - Bonds & Blue Chips",
    beneficiary: "Individual",
    totalValue: "$623,150",
    holdings: [
      {
        id: "TDB902",
        subject: "TD CANADIAN BOND INDEX FUND",
        supplierAccount: "TD-TDB902",
        units: "15,450.00",
        price: "$10.85",
        marketValue: "$167,632.50",
        bookValue: "$165,000.00"
      },
      {
        id: "JNJ-001",
        subject: "JOHNSON & JOHNSON COMMON STOCK",
        supplierAccount: "NYSE-JNJ",
        units: "1,890.00",
        price: "$158.75",
        marketValue: "$300,037.50",
        bookValue: "$295,000.00"
      },
      {
        id: "PG-001",
        subject: "PROCTER & GAMBLE CO COMMON STOCK",
        supplierAccount: "NYSE-PG",
        units: "1,020.00",
        price: "$152.00",
        marketValue: "$155,040.00",
        bookValue: "$150,000.00"
      }
    ],
    settledCAD: "$440.00",
    settledUSD: "$0.00",
    totalInCAD: "$623,150"
  },
  {
    id: "3",
    name: "Client Accounts - Managed Portfolios",
    beneficiary: "Multiple Clients",
    totalValue: "$1,376,850",
    holdings: [
      {
        id: "CLIENT-001",
        subject: "DIVERSIFIED EQUITY PORTFOLIO A",
        supplierAccount: "MANAGED-001",
        units: "2,850.00",
        price: "$285.50",
        marketValue: "$813,675.00",
        bookValue: "$800,000.00"
      },
      {
        id: "CLIENT-002",
        subject: "BALANCED INCOME PORTFOLIO B",
        supplierAccount: "MANAGED-002",
        units: "1,890.00",
        price: "$298.25",
        marketValue: "$563,692.50",
        bookValue: "$550,000.00"
      }
    ],
    settledCAD: "$-517.50",
    settledUSD: "$0.00",
    totalInCAD: "$1,376,850"
  },
  {
    id: "4",
    name: "Trading Account - Active Trading",
    beneficiary: "Individual",
    totalValue: "$892,000",
    holdings: [
      {
        id: "SPY-001",
        subject: "SPDR S&P 500 ETF TRUST",
        supplierAccount: "ARCA-SPY",
        units: "1,200.00",
        price: "$445.80",
        marketValue: "$534,960.00",
        bookValue: "$528,000.00"
      },
      {
        id: "QQQ-001",
        subject: "INVESCO QQQ TRUST SERIES 1",
        supplierAccount: "NASDAQ-QQQ",
        units: "950.00",
        price: "$375.83",
        marketValue: "$357,038.50",
        bookValue: "$360,000.00"
      }
    ],
    settledCAD: "$1.50",
    settledUSD: "$0.00",
    totalInCAD: "$892,000"
  },
  {
    id: "5",
    name: "Retirement Fund - 401(k) & IRA",
    beneficiary: "Individual",
    totalValue: "$456,000",
    holdings: [
      {
        id: "VTSAX",
        subject: "VANGUARD TOTAL STOCK MARKET INDEX FUND",
        supplierAccount: "VANGUARD-VTSAX",
        units: "3,800.00",
        price: "$98.50",
        marketValue: "$374,300.00",
        bookValue: "$370,000.00"
      },
      {
        id: "VTIAX",
        subject: "VANGUARD TOTAL INTERNATIONAL STOCK INDEX FUND",
        supplierAccount: "VANGUARD-VTIAX",
        units: "2,950.00",
        price: "$27.68",
        marketValue: "$81,656.00",
        bookValue: "$80,000.00"
      }
    ],
    settledCAD: "$44.00",
    settledUSD: "$0.00",
    totalInCAD: "$456,000"
  }
]

export default function PortfolioContent() {
  const [open, setOpen] = useState<string | null>(null)
  const [selectedAsset, setSelectedAsset] = useState<string | null>(null)
  const [selectedAccount, setSelectedAccount] = useState<string | null>(null)
  const [selectedAssetForActivity, setSelectedAssetForActivity] = useState<string | null>(null)
  const [selectedAccountForActivity, setSelectedAccountForActivity] = useState<string | null>(null)
  const searchParams = useSearchParams()
  
  // Handle URL parameter for account navigation from dashboard
  useEffect(() => {
    const accountParam = searchParams.get('account')
    if (accountParam) {
      setOpen(accountParam)
      // Scroll to the account or focus on it
      setTimeout(() => {
        const accountElement = document.getElementById(`account-${accountParam}`)
        if (accountElement) {
          accountElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }
      }, 100)
    } else {
      setOpen(ACCOUNTS[0].id)
    }
  }, [searchParams])
  
  // Handle navigation back to portfolio
  const handleBackToPortfolio = () => {
    setSelectedAsset(null)
    setSelectedAccount(null)
  }
  
  // Handle asset click for detail view
  const handleAssetClick = (assetId: string) => {
    setSelectedAsset(assetId)
  }
  
  // Handle account click for detail view
  const handleAccountClick = (accountId: string) => {
    setSelectedAccount(accountId)
  }

  // Handle asset click for activity view
  const handleAssetActivityClick = (assetId: string) => {
    setSelectedAssetForActivity(assetId)
    setSelectedAccountForActivity(null)
  }

  // Handle account activity click
  const handleAccountActivityClick = (accountId: string) => {
    setSelectedAccountForActivity(accountId)
    setSelectedAssetForActivity(null)
  }

  // Handle clicking outside to clear selection
  const handleOutsideClick = (e: React.MouseEvent) => {
    // Only clear if clicking on the main container, not on the chart or its controls
    if (e.target === e.currentTarget) {
      setSelectedAssetForActivity(null)
      setSelectedAccountForActivity(null)
    }
  }

  // Get trading activity for selected asset
  const getTradingActivity = () => {
    if (selectedAssetForActivity && TRADING_ACTIVITY[selectedAssetForActivity]) {
      return TRADING_ACTIVITY[selectedAssetForActivity]
    }
    return []
  }

  // Get trust transactions for selected asset
  const getTrustTransactions = () => {
    if (selectedAssetForActivity && TRUST_TRANSACTIONS[selectedAssetForActivity]) {
      return TRUST_TRANSACTIONS[selectedAssetForActivity]
    }
    return []
  }

  // Get asset details
  const getSelectedAssetDetails = () => {
    if (!selectedAssetForActivity) return null
    
    for (const account of ACCOUNTS) {
      const asset = account.holdings.find(h => h.id === selectedAssetForActivity)
      if (asset) {
        return { ...asset, accountName: account.name }
      }
    }
    return null
  }

  // Notification activity data
  const NOTIFICATION_ACTIVITY = [
    {
      id: "1",
      type: "trade",
      message: "TESLA INC COMMON STOCK - Buy order executed",
      date: "2024-12-15 14:30:25",
      status: "completed",
      amount: "$24,532.00"
    },
    {
      id: "2", 
      type: "alert",
      message: "APPLE INC COMMON STOCK - Price alert triggered",
      date: "2024-12-15 13:45:12",
      status: "pending",
      amount: "$185.64"
    },
    {
      id: "3",
      type: "dividend",
      message: "JOHNSON & JOHNSON - Dividend payment received",
      date: "2024-12-15 12:20:08",
      status: "completed",
      amount: "$1,890.00"
    },
    {
      id: "4",
      type: "trade",
      message: "NVIDIA CORP COMMON STOCK - Sell order executed",
      date: "2024-12-15 11:15:33",
      status: "completed",
      amount: "$42,856.00"
    },
    {
      id: "5",
      type: "alert",
      message: "SPDR S&P 500 ETF - Stop loss triggered",
      date: "2024-12-15 10:30:45",
      status: "completed",
      amount: "$534,960.00"
    }
  ]
  
  // Show asset detail if selected
  if (selectedAsset) {
    return <AssetDetail assetId={selectedAsset} onBack={handleBackToPortfolio} />
  }
  
  // Show account detail if selected
  if (selectedAccount) {
    return <TFSADetail accountId={selectedAccount} onBack={handleBackToPortfolio} />
  }

  return (
    <div className="space-y-6" onClick={handleOutsideClick}>
      {/* Top Summary */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Assets</h2>
          <div className="text-xs text-gray-500">As of August 7, 2020</div>
        </div>
        <div className="flex flex-col items-end gap-1">
          <Button variant="outline" className="text-xs px-3 py-1 border-zinc-200">
            <Download className="w-4 h-4 mr-1" /> Download
          </Button>
          <div className="text-right">
            <div className="text-xs text-gray-500">Total value:</div>
            <div className="font-bold text-lg text-gray-900">$4,195,392</div>
          </div>
        </div>
      </div>

      {/* Quick Account Switcher */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex items-center gap-2 mb-3">
          <Building2 className="w-4 h-4 text-gray-600" />
          <span className="text-sm font-medium text-gray-900">Quick Account Switch</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {ACCOUNTS.map((account) => (
            <Button
              key={account.id}
              variant="outline"
              size="sm"
              className="text-xs border-gray-200 hover:bg-gray-50 transition-all duration-200 ease-in-out hover:scale-105 active:scale-95"
              onClick={() => setOpen(account.id)}
            >
              {account.name.split(' - ')[0]}
            </Button>
          ))}
        </div>
      </div>

      {/* Accounts Accordion */}
      <Accordion type="single" collapsible value={open ?? undefined} onValueChange={setOpen} className="bg-white rounded-xl border border-gray-200">
        {ACCOUNTS.map((account, idx) => {
          const isFromDashboard = searchParams.get('account') === account.id
          return (
            <AccordionItem 
              key={account.id} 
              value={account.id} 
              id={`account-${account.id}`} 
              className={`border-b border-gray-200 ${isFromDashboard ? 'bg-blue-50 border-blue-200' : ''}`}
            >
              <AccordionTrigger className="px-6 py-4 hover:no-underline flex items-center justify-between">
                <div className="flex flex-col md:flex-row md:items-center md:gap-2 w-full">
                  <span 
                    className="font-medium text-blue-600 hover:text-blue-800 cursor-pointer underline transition-colors duration-200"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleAccountClick(account.id)
                    }}
                  >
                    ({account.name})
                  </span>
                  <span className="text-xs text-gray-500 ml-2">(Beneficiary: {account.beneficiary})</span>
                </div>
                <div className="text-xs text-gray-900 font-semibold ml-auto">Total value: {account.totalValue}</div>
              </AccordionTrigger>
            <AccordionContent className="px-6 pb-6">
              {/* Holdings Table */}
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Subjects</TableHead>
                      <TableHead>Supplier Account</TableHead>
                      <TableHead>Units</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Market value</TableHead>
                      <TableHead>Book Value</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {account.holdings.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center text-gray-500">No Holdings Found</TableCell>
                      </TableRow>
                    ) : (
                      account.holdings.map((h) => (
                        <TableRow key={h.id} className={selectedAssetForActivity === h.id ? 'bg-blue-50' : ''}>
                          <TableCell 
                            className="text-blue-600 underline cursor-pointer hover:text-blue-800 transition-colors duration-200"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleAssetActivityClick(h.id)
                            }}
                          >
                            <div className="flex items-center gap-2">
                              <TrendingUp className="w-4 h-4" />
                              {h.id} {h.subject}
                            </div>
                          </TableCell>
                          <TableCell>{h.supplierAccount}</TableCell>
                          <TableCell>{h.units}</TableCell>
                          <TableCell>{h.price}</TableCell>
                          <TableCell>{h.marketValue}</TableCell>
                          <TableCell>{h.bookValue}</TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button size="sm" variant="outline" className="text-xs px-2 py-1 border-zinc-200 transition-all duration-200 ease-in-out hover:scale-105 active:scale-95">
                                  <MoreHorizontal className="w-3 h-3" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => handleAssetClick(h.id)}>
                                  <Eye className="w-4 h-4 mr-2" />
                                  View Details
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleAssetActivityClick(h.id)}>
                                  <BarChart3 className="w-4 h-4 mr-2" />
                                  View Activity
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                  <Edit className="w-4 h-4 mr-2" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Share className="w-4 h-4 mr-2" />
                                  Share
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-red-600">
                                  <Trash2 className="w-4 h-4 mr-2" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
              {/* Settled rows */}
              <div className="mt-2 text-xs text-gray-500">
                <div>Settled Trust Account Balance CAD</div>
                <div>Settled Trust Account Balance USD</div>
              </div>
              <div className="mt-2 text-right font-semibold text-gray-900">Total in CAD <span className="ml-4">{account.totalInCAD}</span></div>
            </AccordionContent>
          </AccordionItem>
          )
        })}
      </Accordion>

      {/* Activity Section - Shows either Notifications or Selected Asset Activity */}
      {selectedAssetForActivity ? (
        <div className="bg-white rounded-xl border border-gray-200 mt-6" onClick={(e) => e.stopPropagation()}>
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <BarChart3 className="w-5 h-5 text-blue-600" />
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    Activity for: {getSelectedAssetDetails()?.subject}
                  </h2>
                  <p className="text-sm text-gray-600">
                    Account: {getSelectedAssetDetails()?.accountName}
                  </p>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedAssetForActivity(null)}
                className="border-gray-200 text-gray-700 hover:bg-gray-50 transition-all duration-200 ease-in-out hover:scale-105 active:scale-95"
              >
                Clear Selection
              </Button>
            </div>
          </div>
          <div className="p-6" onClick={(e) => e.stopPropagation()}>
            <TradingActivityChart 
              assetId={selectedAssetForActivity} 
              assetName={getSelectedAssetDetails()?.subject || ''} 
            />
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 mt-6">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Activity Notifications</h2>
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                <Clock className="w-3 h-3 mr-1" />
                Real-time updates
              </Badge>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-3">
              {NOTIFICATION_ACTIVITY.map((notification) => (
                <div 
                  key={notification.id}
                  className="flex items-center justify-between p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition-all duration-200 ease-in-out"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${
                      notification.type === 'trade' ? 'bg-blue-500' :
                      notification.type === 'alert' ? 'bg-yellow-500' :
                      notification.type === 'dividend' ? 'bg-green-500' : 'bg-gray-500'
                    }`} />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{notification.message}</p>
                      <p className="text-xs text-gray-500">{notification.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge 
                      variant="outline"
                      className={`text-xs ${
                        notification.status === 'completed' ? 'bg-green-50 text-green-700 border-green-200' :
                        notification.status === 'pending' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
                        'bg-gray-50 text-gray-700 border-gray-200'
                      }`}
                    >
                      {notification.status}
                    </Badge>
                    <span className="text-sm font-medium text-gray-900">{notification.amount}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Trading Activity */}
      <div className="bg-white rounded-xl border border-gray-200 mt-6">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Trading Activity</h2>
            {selectedAssetForActivity && (
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                <Clock className="w-3 h-3 mr-1" />
                Showing activity for selected asset
              </Badge>
            )}
          </div>
        </div>
        <div className="p-6">
          <div className="flex flex-wrap gap-2 mb-4">
            <Select>
              <SelectTrigger className="w-32 bg-gray-50 border-gray-200 transition-all duration-200 ease-in-out hover:scale-105 active:scale-95">
                <SelectValue placeholder="Plan" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-32 bg-gray-50 border-gray-200 transition-all duration-200 ease-in-out hover:scale-105 active:scale-95">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
              </SelectContent>
            </Select>
            <Input type="date" className="w-36 bg-gray-50 border-gray-200 transition-all duration-200 ease-in-out hover:scale-105 active:scale-95" />
            <Input type="date" className="w-36 bg-gray-50 border-gray-200 transition-all duration-200 ease-in-out hover:scale-105 active:scale-95" />
            <Button className="bg-zinc-900 text-zinc-50 hover:bg-zinc-800 px-4 transition-all duration-200 ease-in-out hover:scale-105 active:scale-95">
              Search
            </Button>
          </div>
          
          {selectedAssetForActivity && getTradingActivity().length > 0 ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Units</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Value</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {getTradingActivity().map((activity, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">
                        {new Date(activity.date).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant={activity.type === 'Buy' ? 'default' : 'secondary'}
                          className={activity.type === 'Buy' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}
                        >
                          {activity.type}
                        </Badge>
                      </TableCell>
                      <TableCell>{activity.units}</TableCell>
                      <TableCell>{activity.price}</TableCell>
                      <TableCell>{activity.value}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          {activity.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="text-center text-gray-500 py-8">
              {selectedAssetForActivity ? 'No trading activity found for this asset' : 'No Transaction Found'}
            </div>
          )}
        </div>
      </div>

      {/* Trust Transactions */}
      <div className="bg-white rounded-xl border border-gray-200 mt-6">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Trust Transactions</h2>
            {selectedAssetForActivity && (
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                <DollarSign className="w-3 h-3 mr-1" />
                Showing transactions for selected asset
              </Badge>
            )}
          </div>
        </div>
        <div className="p-6">
          {selectedAssetForActivity && getTrustTransactions().length > 0 ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Description</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {getTrustTransactions().map((transaction, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">
                        {new Date(transaction.date).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant={transaction.type === 'Deposit' ? 'default' : 'secondary'}
                          className={transaction.type === 'Deposit' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}
                        >
                          {transaction.type}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-medium">{transaction.amount}</TableCell>
                      <TableCell className="text-sm text-gray-600">{transaction.description}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="text-center text-gray-500 py-8">
              {selectedAssetForActivity ? 'No trust transactions found for this asset' : 'No Trading Activities Found'}
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 