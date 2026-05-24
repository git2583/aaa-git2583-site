// frontend/src/app/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Activity, LayoutGrid, CheckCircle2, AlertTriangle, Clock, RefreshCw } from 'lucide-react';

// 환경 변수 획득
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Supabase 클라이언트 초기화 (비어 있는 경우 모킹 상태로 자가 복구)
const isSupabaseConfigured = supabaseUrl && supabaseAnonKey;
const supabase = isSupabaseConfigured ? createClient(supabaseUrl, supabaseAnonKey) : null;

// 가상 모킹 데이터 (Supabase 미연결 시 로컬 시뮬레이션용)
const MOCK_JOBS = [
  {
    id: 'job-001',
    author: '빌더A',
    status: 'completed',
    title: 'Astro Monorepo 뼈대 구축 및 정적 리서치',
    created_at: '2026-05-24T09:00:00Z',
    failed_reason: null,
    week: 1,
  },
  {
    id: 'job-002',
    author: '디자이너B',
    status: 'pending',
    title: 'Tailwind CSS HSL Hues 테마 적용 및 가시성 확보',
    created_at: '2026-05-24T10:15:00Z',
    failed_reason: null,
    week: 1,
  },
  {
    id: 'job-003',
    author: '옵스C',
    status: 'failed',
    title: 'GitHub Actions 자동 배포 트리거 구축 실패 내역',
    created_at: '2026-05-24T10:20:00Z',
    failed_reason: 'GitHub API Rate Limit Exceeded (403 Forbidden)',
    week: 1,
  }
];

export default function DashboardPage() {
  const [jobs, setJobs] = useState<any[]>(MOCK_JOBS);
  const [connectionStatus, setConnectionStatus] = useState<string>('로컬 모킹 모드');

  useEffect(() => {
    if (!supabase) {
      console.log('[정보] Supabase 환경 변수가 제공되지 않아 모킹 데이터를 활성화합니다.');
      return;
    }

    setConnectionStatus('Supabase 실시간 연동 중');

    // 1. 초기 적재 데이터 Fetch
    const fetchInitialJobs = async () => {
      const { data, error } = await supabase
        .from('pipeline_jobs')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data) {
        setJobs(data);
      } else {
        console.error('[오류] Supabase 테이블 초기 로드 실패:', error);
      }
    };
    fetchInitialJobs();

    // 2. Supabase Realtime 리스너 등록
    const channel = supabase
      .channel('realtime-pipeline-jobs')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'pipeline_jobs',
        },
        (payload) => {
          console.log('[실시간 업데이트 감지]:', payload);
          const { eventType, new: newRecord, old: oldRecord } = payload;

          setJobs((prevJobs) => {
            if (eventType === 'INSERT') {
              return [newRecord, ...prevJobs];
            } else if (eventType === 'UPDATE') {
              return prevJobs.map((job) => (job.id === newRecord.id ? newRecord : job));
            } else if (eventType === 'DELETE') {
              return prevJobs.filter((job) => job.id !== oldRecord.id);
            }
            return prevJobs;
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // 카드 상태 렌더링 도우미 함수
  const renderStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return (
          <span className="flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded bg-green-100 text-green-800">
            <CheckCircle2 size={14} /> 완료
          </span>
        );
      case 'pending':
      case 'processing':
        return (
          <span className="flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded bg-yellow-100 text-yellow-800 animate-pulse">
            <RefreshCw size={14} className="animate-spin" /> 처리 중
          </span>
        );
      case 'failed':
        return (
          <span className="flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded bg-red-100 text-red-800">
            <AlertTriangle size={14} /> 실패
          </span>
        );
      default:
        return (
          <span className="flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded bg-gray-100 text-gray-800">
            <Clock size={14} /> 대기
          </span>
        );
    }
  };

  return (
    <div className="min-h-screen bg-neutral-900 text-neutral-100 p-8 font-sans selection:bg-yellow-400 selection:text-neutral-900">
      
      {/* 대시보드 헤더 */}
      <header className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end border-b border-neutral-800 pb-6 mb-8 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Activity className="text-yellow-400 animate-pulse" size={24} />
            <span className="text-xs uppercase tracking-widest text-neutral-400 font-bold bg-neutral-800 px-3 py-1 rounded-full border border-neutral-700">
              Antigravity 2.0 Engine
            </span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">AAA TEAM 실시간 대시보드 갤러리</h1>
          <p className="text-neutral-400 text-sm mt-1">사용자 작업물 비동기 파이프라인 실시간 상태 모니터링 시스템</p>
        </div>
        
        <div className="flex items-center gap-2 bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2 text-xs">
          <span className={`w-2.5 h-2.5 rounded-full ${isSupabaseConfigured ? 'bg-emerald-500 animate-ping' : 'bg-orange-500'}`} />
          <span className="font-semibold text-neutral-300">{connectionStatus}</span>
        </div>
      </header>

      {/* 종합 상태판 */}
      <section className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-neutral-800/50 border border-neutral-800 rounded-xl p-5 backdrop-blur">
          <h3 className="text-xs text-neutral-400 font-bold uppercase tracking-wider mb-1">총 파이프라인 태스크</h3>
          <p className="text-2xl font-black text-white">{jobs.length} <span className="text-xs font-normal text-neutral-400">개</span></p>
        </div>
        <div className="bg-neutral-800/50 border border-neutral-800 rounded-xl p-5 backdrop-blur">
          <h3 className="text-xs text-neutral-400 font-bold uppercase tracking-wider mb-1">정상 완수</h3>
          <p className="text-2xl font-black text-green-400">{jobs.filter(j => j.status === 'completed').length} <span className="text-xs font-normal text-neutral-400">개</span></p>
        </div>
        <div className="bg-neutral-800/50 border border-neutral-800 rounded-xl p-5 backdrop-blur">
          <h3 className="text-xs text-neutral-400 font-bold uppercase tracking-wider mb-1">진행 / 대기 중</h3>
          <p className="text-2xl font-black text-yellow-400">{jobs.filter(j => j.status === 'pending' || j.status === 'processing').length} <span className="text-xs font-normal text-neutral-400">개</span></p>
        </div>
        <div className="bg-neutral-800/50 border border-neutral-800 rounded-xl p-5 backdrop-blur">
          <h3 className="text-xs text-neutral-400 font-bold uppercase tracking-wider mb-1">장애 실패</h3>
          <p className="text-2xl font-black text-red-400">{jobs.filter(j => j.status === 'failed').length} <span className="text-xs font-normal text-neutral-400">개</span></p>
        </div>
      </section>

      {/* 메인 갤러리 영역 */}
      <main className="max-w-6xl mx-auto">
        <div className="flex items-center gap-2 mb-6">
          <LayoutGrid size={18} className="text-neutral-400" />
          <h2 className="text-lg font-bold text-neutral-200">실시간 유저 작업물 갤러리</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <article 
              key={job.id} 
              className={`group bg-neutral-800/30 border border-neutral-800 hover:border-neutral-700 transition-all duration-300 rounded-xl overflow-hidden p-6 flex flex-col justify-between min-h-[180px] hover:shadow-lg hover:shadow-black/20 ${job.status === 'pending' ? 'ring-1 ring-yellow-500/30' : ''}`}
            >
              <div>
                <div className="flex justify-between items-start mb-3">
                  <span className="text-[10px] font-black tracking-widest text-neutral-500 uppercase bg-neutral-800 px-2 py-0.5 rounded border border-neutral-700">
                    Week {job.week}
                  </span>
                  {renderStatusBadge(job.status)}
                </div>
                
                <h3 className="text-base font-bold text-white group-hover:text-yellow-400 transition-colors line-clamp-2">
                  {job.title}
                </h3>
                
                {job.failed_reason && (
                  <p className="text-xs text-red-400 mt-2 bg-red-950/40 border border-red-900/30 rounded p-2 font-mono break-words">
                    {job.failed_reason}
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between mt-6 pt-4 border-t border-neutral-800/80 text-xs text-neutral-400">
                <div className="flex items-center gap-1.5">
                  <div className="w-5 h-5 rounded-full bg-neutral-700 flex items-center justify-center font-bold text-[10px] text-white">
                    {job.author.substring(0, 1)}
                  </div>
                  <span className="font-semibold text-neutral-300">{job.author}</span>
                </div>
                <span className="text-[10px]">
                  {new Date(job.created_at).toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </article>
          ))}
        </div>
      </main>

      {/* 대시보드 푸터 */}
      <footer className="max-w-6xl mx-auto border-t border-neutral-800 mt-16 pt-6 text-center text-xs text-neutral-500">
        <p>© 2026 AAA TEAM by git2583 · Powered by Antigravity 2.0 Realtime Engine</p>
      </footer>
    </div>
  );
}
