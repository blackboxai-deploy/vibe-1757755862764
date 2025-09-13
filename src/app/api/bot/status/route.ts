import { NextRequest, NextResponse } from 'next/server';
import { tradingBot } from '@/lib/trading-bot';

export async function GET(_request: NextRequest) {
  try {
    const state = tradingBot.getState();
    
    return NextResponse.json({
      success: true,
      data: {
        status: state.status,
        positions: state.positions,
        trades: state.trades.slice(-10), // Last 10 trades
        marketData: state.marketData,
        analysis: state.analysis,
        indicators: state.indicators,
        riskMetrics: state.riskMetrics,
        actions: state.actions.slice(0, 10), // Last 10 actions
        config: state.config, // Add config to response
      },
    });
  } catch (error) {
    console.error('Error getting bot status:', error);
    return NextResponse.json({
      success: false,
      message: 'Internal server error',
      error: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 500 });
  }
}

export async function POST(_request: NextRequest) {
  try {
    // Reset bot to initial state
    tradingBot.reset();
    
    return NextResponse.json({
      success: true,
      message: 'Trading bot reset successfully',
      status: tradingBot.getStatus(),
    });
  } catch (error) {
    console.error('Error resetting bot:', error);
    return NextResponse.json({
      success: false,
      message: 'Internal server error',
      error: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 500 });
  }
}