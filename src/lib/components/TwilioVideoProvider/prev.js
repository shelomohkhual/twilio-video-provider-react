<div style={{ width: '100%' }}>
<div style={{
    width: '100%',
    minHeight: 'calc(100vh - (var(--topbarHeightDesktop) + 70px))',
    display: 'flex'
}}>

    {!room ?
        <LocalVideoPreview
            localTracks={localTracks}
            identity='shelomoh'
            user={convertAllSdkTypes(currentUser)}
        />
        : <>
            {/* participants */}
            <div id='paricipant-container' style={{ width: '25%', backgroundColor: 'black' }}>
                {room && <></>}
            </div>

            {/* primaryDisplayContainer */}
            <div id='primary-display-container' style={{ width: '75%', backgroundColor: 'grey' }}>
            </div>
        </>}

</div>


<div style={{
    display: 'flex',
    justifyContent: 'center'
}}>
    <button>Mic</button>
    <button>Cam</button>
    {!room ? <>
        <button onClick={handleOnJoin}>Join</button>
    </> : <>
        <button onClick={handleOnShareScreen}>Screen</button>
        <button onClick={handleOnEndCall}>End</button>
    </>
    }


</div>
</div>